const {AsyncQuery, AsyncQuery2} = require('../db/connectDB')

const Fine = {
    getAllFines: async (req, res) => {
        const { page, paid, borrowId, cardId } = req.query;
        const lim = 20;
        const skip = (page && (Math.max(parseInt(page), 1) - 1) * lim)

        const p = [
            ['has_paid', paid || '0'],
            ['borrow_id', borrowId || ''],
            ['card_id', cardId || '']
        ];

        const q = `
            select fine_id, b.borrow_id, card_id,cause, amount, has_paid from fine f 
	            join Borrow b on f.borrow_id = b.borrow_id
            where ${p[0][0]} = @${p[0][0]}
                and b.borrow_id like '%' + @${p[1][0]} + '%'
                and ${p[2][0]} like '%' + @${p[2][0]} + '%'
            order by fine_id desc
            offset ${skip || 0} rows fetch next ${lim} rows only
        `;

        const result = await AsyncQuery2(q, p);
        result.data = result.data.recordset;

        res.json(result.data);
    },

    countFines : async (req, res) => {
        const { paid, borrowId, cardId } = req.query;

        const p = [
            ['has_paid', paid || '0'],
            ['borrow_id', borrowId || ''],
            ['card_id', cardId || '']
        ];
        const q = `
            select count(*) as c from fine f
	            join Borrow b on f.borrow_id = b.borrow_id
            where ${p[0][0]} = @${p[0][0]}
                and b.borrow_id like '%' + @${p[1][0]} + '%'
                and ${p[2][0]} like '%' + @${p[2][0]} + '%'
        `;

        const result = await AsyncQuery2(q, p);
        result.data = result.data.recordset;

        res.json(result.data[0].c);
    },

    getAllFinesByCard: async (req, res) => {
        const { cardId } = req.params;
        const p = [['card_id', cardId]]
        const query = `
            select * 
            from fine 
            where borrow_id in (
                select borrow_id
                from Borrow
                where ${p[0][0]} = @${p[0][0]}
            )
        `;

        const result = await AsyncQuery2(query, p);
        result.data = result.data.recordset;
        res.json(result.data)
    },

    payFine: async (req, res) => {
        const { id } = req.params
        const result = await AsyncQuery('proc_pay_fine', [['fine_id', id]], true);
        result.data = 'Fine paid';
        res.json(result);
    }
}

module.exports = Fine;