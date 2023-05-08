const {AsyncQuery, AsyncQuery2} = require('../db/connectDB');
const { convertToDMY } = require('../utils/convertDate');

const Card = {
    getAllCards: async (req, res) => {
        const { page, limit, id, name, active } = req.query;

        const lim = (limit && Math.max(parseInt(limit), 1)) || 20
        const skip = (page && (Math.max(parseInt(page), 1) - 1) * lim)

        const p = [
            ['card_id', id || ''],
            ['name', name || ''],
            ['active', active]
        ]

        const query = `
            select * from lib_card
            where ${p[0][0]} like @${p[0][0]} + '%' 
                and ${p[1][0]} like '%' + @${p[1][0]} + '%' 
                and (${p[2][0]} = @${p[2][0]} or @${p[2][0]} is null)
            order by id desc
            offset ${skip||0} rows fetch next ${lim} rows only
        `
        const result = await AsyncQuery2(query, p);
        result.data = result.data.recordset.map(x => {
            return {
                ...x, birth_date: convertToDMY(x.birth_date),
                issue_date: convertToDMY(x.issue_date),
                expire_date: convertToDMY(x.expire_date)
            }
        });
        res.json(result.data);
    },

    findCard: async (req, res) => {
        const { id } = req.params;

        const p = [['card_id', id]];
        const q = `
            select card_id, name, birth_date, school_year, department, c.active as active, 
                issue_date, expire_date,  username, a.active as acc_active, c.acc_id
            from lib_card c left outer join account a on c.acc_id = a.id
        `;

        const result = await AsyncQuery(q, p);
        const data = result.data.recordset[0];
        if (!data) res.json(data);
        const formattedData = {
            ...data, birth_date: convertToDMY(data.birth_date),
            issue_date: convertToDMY(data.issue_date),
            expire_date: convertToDMY(data.expire_date)
        }
        res.json(formattedData);
    },

    countCard: async (req, res) => {
        const { id, name, active } = req.query;

        const p = [
            ['card_id', id || ''],
            ['name', name || ''],
            ['active', active]
        ]

        const query = `
            select count(*) as c from lib_card
            where ${p[0][0]} like @${p[0][0]} + '%' 
                and ${p[1][0]} like '%' + @${p[1][0]} + '%' 
                and (${p[2][0]} = @${p[2][0]} or @${p[2][0]} is null)
        `
        const result = await AsyncQuery2(query, p);
        result.data = result.data.recordset[0].c;
        res.json(result.data);
    },

    addCard: async (req, res) => {
        const { name, birth_date, school_year, department } = req.body;
        const p = [
            ['name', name],
            ['bday', birth_date],
            ['year', school_year],
            ['dep', department]
        ]
        const result = await AsyncQuery('proc_add_card',p, true);
        result.data = 'Card added';
        res.json(result)
    },

    updateCard: async (req, res) => {
        const { id } = req.params;
        const { name, birth_date, school_year, department, expire_date } = req.body;

        const p = [
            ['card_id', id],
            ['name', name],
            ['bday', birth_date],
            ['year', school_year],
            ['dep', department],
            ['expire_date', expire_date]
        ]
        console.log(p);
        const proc = 'proc_upd_card';
        const result = await AsyncQuery(proc, p, true);

        result.data = 'Card updated';
        res.json(result);
    },

    blockCard: async (req, res) => {
        const { id } = req.params;

        const p = [['card_id', id]];

        const result = await AsyncQuery('proc_block_card', p, true);

        result.data = 'Card updated';
        res.json(result);
    }
}

module.exports = Card;