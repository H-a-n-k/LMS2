const { AsyncQuery, AsyncQuery2 } = require("../db/connectDB");
const { StatusCodes: Status } = require('http-status-codes')
const CustomError = require('../utils/customErr')

const CheckModel = ({name, phone, email}) => { 
    if (!name) throw new CustomError(Status.BAD_REQUEST, 'Vui lòng nhập tên');
    if (!phone) throw new CustomError(Status.BAD_REQUEST, 'Vui lòng nhập SĐT');

    if (!/^0\d+$/.test(phone) || phone.length !== 10) throw new CustomError(Status.BAD_REQUEST, 'SĐT phải là 10 chữ số và bắt đầu là 0');
    if (name.length > 50) throw new CustomError(Status.BAD_REQUEST, 'Tên tối đa 50 kí tự');
    if (email && (!/^[a-zA-Z0-9]+\@[a-zA-Z0-9]+\.com$/.test(email) || email.length > 50)) throw new CustomError(Status.BAD_REQUEST, 'Email đối đa 50 kí tự và có dạng ?@?.com');
}

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

        CheckModel({ name, phone, email });

        const p = [
            ['username', username],
            ['password', password],
            ['name', name],
            ['phone', phone],
            ['email', email]
        ]

        if (!username || !password) throw new CustomError(Status.BAD_REQUEST, 'Vui lòng nhập tài khoản, mật khẩu');
        if (username.length < 5 || username.length > 20) throw new CustomError(Status.BAD_REQUEST, 'Tài khoản phải từ 5-20 kí tự');
        if (password.length < 5 || password.length > 20) throw new CustomError(Status.BAD_REQUEST, 'Mật khẩu phải từ 5-20 kí tự');

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

        CheckModel({ name, phone, email });

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