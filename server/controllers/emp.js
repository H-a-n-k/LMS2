const { AsyncQuery, AsyncQuery2 } = require("../db/connectDB");

const Emp = {
    getList: async (req, res) => {
        const q = `
            select e.id, e.name, phone, email, username, active
            from employee e
                join account a on e.acc_id = a.id
        `;
        const result = await AsyncQuery(q);
        const data = result.data.recordset;
        res.json(data);
    },

    add: async (req, res) => {
        const {name, phone, email, username, password} = req.body;

        const p = [
            ['username', username],
            ['password', password],
            ['name', name],
            ['phone', phone],
            ['email', email]
        ]

        const q = 'proc_add_emp';
        const result = await AsyncQuery(q, p, true);

        res.json(result);
    },

    getOne: async (req, res) => {
        const { id } = req.params
        
        const p = [
            ['id', id]
        ]

        const q = `
            select e.id, e.name, phone, email, username, active, a.id as acc_id
            from employee e
                join account a on e.acc_id = a.id
            where e.id = @${p[0][0]}
        `;
        const result = await AsyncQuery2(q, p);
        const data = result.data.recordset[0]
        res.json(data);
    },

    update: async (req, res) => {
        const { id } = req.params;
        const { name, phone, email } = req.body;

        const p = [
            ['id', id],
            ['name', name],
            ['phone', phone],
            ['email', email]
        ]

        const q = 'proc_upd_emp'

        const result = await AsyncQuery(q, p, true);
        res.json(result);
    }
}

module.exports = Emp;