const {AsyncQuery, AsyncQuery2} = require('../db/connectDB');
const { convertToDMY } = require('../utils/convertDate');

const Borrow = {
    getAllBorrows: async (req, res) => {
        const { page, borrow, id } = req.query;

        const lim = 20;
        const skip = (page && (Math.max(parseInt(page), 1) - 1) * lim)

        const p = [['borrow_id', id]];

        const q = `
            select * from borrow
            where ret_date is ${(borrow && borrow == 'true') ? '' : 'not'} null
                and ${p[0][0]} like @${p[0][0]} + '%'
            order by id desc
            offset ${skip || 0} rows fetch next ${lim} rows only
        `

        const result = await AsyncQuery2(q, p);
        const data = result.data.recordset.map(x => {
            return {
                ...x,
                bor_date: convertToDMY(x.bor_date),
                due_date: convertToDMY(x.due_date),
                ret_date: convertToDMY(x.ret_date)
            }
        });
        res.json(data)
    },

    countBorrow: async (req, res) => {
        const { borrow, id } = req.query;

        const p = [['borrow_id', id]];

        const q = `
            select count(*) as c from borrow
             where ret_date is ${(borrow && borrow == 'true') ? '' : 'not'} null
                and ${p[0][0]} like @${p[0][0]} + '%'
        `;

        const result = await AsyncQuery2(q, p);
        const data = result.data.recordset[0].c;
        res.json(data)
    },

    findBorrowByCardAndCopy: async (req, res) => {
        const {copy, card} = req.query

        const p = [
            ['copy_id', copy],
            ['card_id', card]
        ]
        const query = `select * from borrow`
        const result = await AsyncQuery(query, p);
        res.json(result)
    },

    findBorrowById: async (req, res) => {
        const { id } = req.params;

        const p = [
            ['id', id]
        ]
        const query = `select * from borrow`
        const result = await AsyncQuery(query, p);
        res.json(result);
    },

    addBorrow: async (req, res) => {
        const { copy, card } = req.body;
        const p = [
            ['copy_id', copy],
            ['card_id', card]
        ];
        const proc = 'proc_add_borrow';
        const result = await AsyncQuery(proc, p, true);
        result.data = 'Borrow detail created';
        res.json(result);
    },

    returnBook: async (req, res) => {
        const { id } = req.params;
        const { status } = req.body;
        const p = [
            ['borrow_id', id],
            ['ret_status', status]
        ]
        const result = await AsyncQuery('proc_return_book', p, true)
        result.data = 'Return successfully';
        res.json(result);
    },
    
    findBorrowByCard: async (req, res) => {
        const { cardId } = req.params;
        const query = `
            select borrow_id, bor_date, due_date, ret_date, ret_status, book_name, br.copy_id
            from borrow br join Book_Copy bc on br.copy_id = bc.copy_id
                join book bk on bc.book_id = bk.book_id
        `
        const p = [['card_id', cardId]];
        
        const result = await AsyncQuery(query, p);
        result.data = result.data.recordset.map(x => { 
            return {
                ...x,
                bor_date: convertToDMY(x.bor_date),
                due_date: convertToDMY(x.due_date),
                ret_date: convertToDMY(x.ret_date)
            }
        });
        res.json(result.data);
    }
}

module.exports = Borrow