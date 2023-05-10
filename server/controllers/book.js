const {AsyncQuery, AsyncQuery2} = require('../db/connectDB')

const Book = {
    getAllBooks: async (req, res) => {
        //
        const { limit, keyword, cateId, page, asc, orderBy, searchCol } = req.query;

        const lim = (limit && Math.max(parseInt(limit), 1)) || 20
        const skip = (page && (Math.max(parseInt(page), 1) - 1) * lim)
        const p = [
            ['keyword', keyword || ''],
            ['cate_id', cateId || 0],
            ['limit',  lim],
            ['skip', skip  || 0]
        ]
        const cate = cateId > 0 ? ` and ${p[1][0]} = @${p[1][0]}` : '';

        let order = (!orderBy || !['add_date', 'book_name'].includes(orderBy)) ? 'add_date' : orderBy;
        let search = (!searchCol || !['book_name', 'author', 'book_id'].includes(searchCol)) ? 'book_name' : searchCol;

        const query = `
            select * 
            from book
            where ${search} like '%'+ @${p[0][0]} + '%' ${cate}
            order by ${order} ${asc === 'true' ? '' : 'desc'}, id ${asc === 'true' ? '' : 'desc'} 
            offset @${p[3][0]} rows fetch next @${p[2][0]} rows only
        `;

        const result = await AsyncQuery2(query, p);
        result.data = result.data.recordset;
        res.json(result.data);
    },

    countBook: async (req, res) => {
        const { keyword, cateId, searchCol} = req.query;

        const p = [
            ['keyword', keyword || ''],
            ['cate_id', cateId || 0]
        ]

        const cate = cateId > 0 ? ` and ${p[1][0]} = @${p[1][0]}` : ''; 
        let search = (!searchCol || !['book_name', 'author', 'book_id'].includes(searchCol)) ? 'book_name' : searchCol;
    
        const query = `
            select count(*) as count
            from book
            where ${search} like '%' + @${p[0][0]} + '%' ${cate}
        `;
        const result = await AsyncQuery2(query, p);
        result.data = result.data.recordset[0].count;

        res.json(result.data);
    },

    getSearchHints: async (req, res) => {
        const { keyword, cateId, searchCol } = req.query;
        const p = [
            ['keyword', keyword || ''],
            ['cate_id', cateId || 0]
        ];
        const cate = cateId > 0 ? ` and ${p[1][0]} = @${p[1][0]}` : '';
        let search = (!searchCol || !['book_name', 'author', 'book_id'].includes(searchCol)) ? 'book_name' : searchCol;
        const query = `
                select distinct top 100 ${search} 
                from book where ${search} like '%' + @${p[0][0]} + '%' ${cate}
            `;
        
        const result = await AsyncQuery2(query, p);

        result.data = result.data.recordset.map(x => x[search]);
        res.json(result.data);
    },

    findBookById: async (req, res) => {
        const { id } = req.params;
        const query = ` select book_id, book_name, quantity, author, publisher, publishYr, summary, add_date, coverImg, b.cate_id, id, cate_name 
            from book b left outer join Category c on b.cate_id = c.cate_id`;
        const p = [['book_id', id]];
        const result = await AsyncQuery(query, p);

        result.data = result.data.recordset[0] || null;
        res.json(result.data);
    },

    addBook: async (req, res) => {
        const { book_name, author, publishYr, publisher,
            summary, coverImg, cate_id } = req.body;

        const proc = 'proc_add_book';
        const p = [
            ['book_name', book_name],
            ['author', author],
            ['publishYr', publishYr],
            ['publisher', publisher],
            ['summary', summary],
            ['coverImg', coverImg],
            ['cate_id', cate_id]
        ]

        const result = await AsyncQuery(proc, p, true);
        
        result.data = "book added"
        res.json(result.data);
    },

    updateBook: async (req, res) => {
        const { id } = req.params;
        const { book_name, author, publishYr, publisher,
            summary, coverImg, cate_id } = req.body;
        
        const proc = 'proc_upd_book';
        const p = [
            ['book_id', id],
            ['book_name', book_name],
            ['author', author],
            ['publishYr', publishYr],
            ['publisher', publisher],
            ['summary', summary],
            ['coverImg', coverImg],
            ['cate_id', cate_id]
        ]

        const result = await AsyncQuery(proc, p, true);
        result.data = 'book updated';
        res.json(result.data)
    },

    deleteBook: async (req, res) => {
        const { id } = req.params;
        const proc = 'proc_del_book';
        const p = [['book_id', id]];

        const result = await AsyncQuery(proc, p, true);
        result.data = 'book deleted'
        res.json(result.data)
    },
    getPopularBooks: async (req, res) => {
        const { fromDate, toDate, limit } = req.query;

        let where = '';
        if (fromDate || toDate) where += 'where '
        if (fromDate) where += `bor_date >= '${fromDate}'`
        if (fromDate && toDate) where += ' AND '
        if (toDate) where += `bor_date <= '${toDate}'`

        //let top = limit ? `top ${limit}` : '';
        let top = `top ${limit || 6}`;

        const q = `
            select ${top} bk.book_id, book_name, quantity, author, publishYr, publisher, summary, add_date, coverImg, cate_id
            from Book bk join (
                select bc.book_id, count(*) as c
                from Borrow br join Book_Copy bc on bc.copy_id = br.copy_id
                ${where}
                group by bc.book_id
            ) br on bk.book_id = br.book_id   
            order by br.c desc
        `;
        const result = await AsyncQuery(q);
        //result.data = result.data.recordset
        //res.json(result);
        res.json(result.data.recordset);
    }
}

module.exports = Book;