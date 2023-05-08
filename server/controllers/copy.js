const {AsyncQuery, AsyncQuery2} = require('../db/connectDB')

const Copy = {
    getAllCopies: async (req, res) => {
        const result = await AsyncQuery('select * from book_copy');
        res.json(result);
    },
    getAllCopiesByBook: async (req, res) => {
        const { bookId } = req.params;
        const { state } = req.query;

        const query = `
            select c.copy_id, s.state_name, c.note, c.state_id
            from book_copy c join Copy_State s on c.state_id = s.id
        `;
        const p = [
            ['book_id', bookId],
            ['state_id', state]
        ];
        //if (state) p.push();
        const result = await AsyncQuery(query, p);
        result.data = result.data.recordset
        res.json(result.data);
    },

    addCopy: async (req, res) => {
        const { book_id, note } = req.body
        const proc = 'proc_add_copy';
        const p = [
            ['book_id', book_id],
            ['note', note]
        ]

        const result = await AsyncQuery(proc, p, true);
        result.data = 'Copy added';
        res.json(result);
    },

    updateCopy: async (req, res) => {
        const { id } = req.params;
        const { state_id, note } = req.body;

        const proc = 'proc_upd_copy';
        const p = [
            ['copy_id', id],
            ['state_id', state_id],
            ['note', note]
        ]
        
        const result = await AsyncQuery(proc, p, true);
        result.data = 'Copy updated';

        res.json(result);
    },

    deleteCopy: async (req, res) => {
        const { id } = req.params;

        const proc = 'proc_del_copy';
        const p = [['copy_id', id]];

        const result = await AsyncQuery(proc, p, true);
        result.data = 'Copy deleted';
        res.json(result);
    },

    findCopy: async (req, res) => {
        const { search } = req.query
        const p = [['copy_id', search]];
        const query = `select * from Book_Copy where ${p[0][0]} like '%' + @${p[0][0]} + '%'`;
        const result = await AsyncQuery2(query, p);

        result.data = result.data.recordset
        res.json(result);
    }
}

module.exports = Copy;