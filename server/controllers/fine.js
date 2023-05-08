const {AsyncQuery, AsyncQuery2} = require('../db/connectDB')

const Fine = {
    getAllFines: async (req, res) => {
        const result = await AsyncQuery('select * from fine');
        result.data = result.data.recordset;

        res.json(result);
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
        res.json(result)
    },

    payFine: async (req, res) => {
        const { id } = req.params
        const result = await AsyncQuery('proc_pay_fine', [['fine_id', id]], true);
        result.data = 'Fine paid';
        res.json(result);
    }
}

module.exports = Fine;