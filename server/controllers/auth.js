const CustomError = require('../utils/customErr');
const { AsyncQuery } = require('../db/connectDB')
const { StatusCodes: Status } = require('http-status-codes')
const jwt = require('jsonwebtoken');

const Auth = {
    login: async (req, res) => {
        const { user, pass } = req.body;

        if (!user || !pass) throw new CustomError(Status.BAD_REQUEST, 'Vui lòng điền tài khoản và mật khẩu');
        if (user.length < 5 || user.length > 20) throw new CustomError(Status.BAD_REQUEST, 'Tài khoản phải từ 5-20 kí tự');
        if (pass.length < 5 || pass.length > 20) throw new CustomError(Status.BAD_REQUEST, 'Mật khẩu phải từ 5-20 kí tự');

        const sp = 'proc_login';
        const p = [
            ['username', user],
            ['password', pass]
        ];

        const result = await AsyncQuery(sp, p, true);
        const data = result.data.recordset[0];
        if (!data) throw new CustomError(Status.UNAUTHORIZED, 'Sai tài khoản hoặc mật khẩu');
        
        const { role, active } = data;
        const uid = data.card_id || data.emp_id;

        if (!active) throw new CustomError(Status.FORBIDDEN, 'Tài khoản bị khóa');
        
        const token = jwt.sign({ role }, process.env.JWT_SECRET);
        res.json({ token, role, uid });
    }
}

module.exports = Auth;