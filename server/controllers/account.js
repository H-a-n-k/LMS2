const {AsyncQuery} = require('../db/connectDB')

const Account = {
    getAllAccounts: async (req, res) => {
        const query = 'select * from account where isAdmin=0'
        const result = await AsyncQuery(query);
        result.data = result.data.recordset;
        res.json(result);
    },

    logIn: async (req, res) => {
        const { username, password } = req.body

        const p = [
            ['username', username],
            ['password', password],
            ['active', true]
        ]
        const query = 'select top 1 * from account';
        const result = await AsyncQuery(query, p);

        if (result.data && result.data.recordset.length > 0) {
            const { username, isAdmin } = result.data.recordset[0]
            result.data = `User ${username} has logged in${isAdmin?' as admin':''}`
        } else { 
            result.data = "User or password not found or account not active"
        }

        res.json(result);
    },

    createUser: async (req, res) => {
        const {
            username, password, name,
            addr, phone, birthdate,
            email, sex
        } = req.body

        const proc = 'proc_add_acc';
        const p = [
            ['username', username],
            ['password', password],
            ['name', name],
            ['phone', phone],
            ['birth_date', birthdate],
            ['email', email],
            ['sex', sex],
            ['addr', addr]
        ]
        const result = await AsyncQuery(proc, p, true)
        const { rowsAffected: row } = result.data
        result.data = row ? 'Account created' : 'Error';

        res.json(result);
    },

    findUserById: async (req, res) => {
        const { id } = req.params
        const p = [
            ['id', id]
        ]
        const query = 'select top 1 * from account';
        const result = await AsyncQuery(query, p);
        result.data = result.data.recordset[0] || null;
        res.json(result);
    },

    updateUser: async (req, res) => {
        const {id} = req.params

        const {
            username, name,
            addr, phone, birthdate,
            email, sex
        } = req.body

        const proc = 'proc_upd_acc';
        const p = [
            ['id', id],
            ['username', username],
            ['name', name],
            ['addr', addr],
            ['phone', phone],
            ['birth_date', birthdate],
            ['email', email],
            ['sex', sex]
        ]

        const result = await AsyncQuery(proc, p, true);
        const { rowsAffected: row } = result.data
        result.data = row ? 'Account updated' : 'failed';
        res.json(result)
    },

    blockUser: async (req, res) => {
        const { id } = req.params
        const p = [['id', id]]

        const proc = 'proc_block_acc'
        const result = await AsyncQuery(proc, p, true);
        const { rowsAffected: row } = result.data
        result.data = row ? 'Account updated' : 'failed';
        res.json(result);
    },

    changePassword: async (req, res) => {
        const { id } = req.params
        const { password } = req.body;
        const p = [
            ['id', id],
            ['password', password]
        ];

        const result = await AsyncQuery('proc_change_password', p, true);
        result.data = 'Password updated';
        res.json(result);
    }
}

module.exports = Account;