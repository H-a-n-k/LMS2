const { AsyncQuery } = require('../db/connectDB')
const { StatusCodes: Status } = require('http-status-codes')
const CustomError = require('../utils/customErr')

const CheckModel = (model) => { 
    const { name } = model;
    
    if (!name) throw new CustomError(Status.BAD_REQUEST, 'Vui lòng nhập tên thể loại');
    if (name.length < 3 || name.length > 20) throw new CustomError(Status.BAD_REQUEST, 'Tên loại phải từ 3-20 kí tự');
}

const Category = {
    getAllCategories: async (req, res) => {
        const result = await AsyncQuery('select * from category');
        result.data = result.data.recordset
        res.json(result.data);
    },

    addCategory: async (req, res) => {
        const { name } = req.body;
        CheckModel({ name });
        
        const result = await AsyncQuery('proc_add_cate', [['cate_name', name]], true);
        result.data = 'category added';
        res.json(result.data);
    },

    deleteCategory: async (req, res) => {
        const { id } = req.params;

        const result = await AsyncQuery('proc_del_cate', [['cate_id', id]], true);
        result.data = 'category deleted';
        res.json(result.data);
    },

    updateCategory: async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;

        CheckModel({ name });

        const p = [
            ['cate_id', id],
            ['cate_name', name]
        ]

        const result = await AsyncQuery('proc_upd_cate', p, true);
        result.data = 'category updated';
        res.json(result.data);
    },

    findCategory: async (req, res) => {
        const { id } = req.params;

        const p = [
            ['cate_id', id]
        ]

        const result = await AsyncQuery('select cate_name from category', p);
        result.data = result.data.recordset[0] ? result.data.recordset[0].cate_name : null;
        res.json(result.data);
    }
}

module.exports = Category