const { AsyncQuery } = require('../db/connectDB')
const jwt = require('jsonwebtoken');

const Auth = {
    login: async (req, res) => {
        const { user, pass } = req.body;
        const sp = 'proc_login';
        const p = [
            ['username', user],
            ['password', pass]
        ];

        const result = await AsyncQuery(sp, p, true);
        const data = result.data.recordset;
        const role = data[0].role;
        const uid = data[0].card_id || data[0].emp_id;
        if (!role) {
            res.status(401).json({ err: 'Wrong credentials' });
            return;
        } 
        
        const token = jwt.sign({ role }, process.env.JWT_SECRET);
        res.json({ token, role, uid });
    }
}

module.exports = Auth;