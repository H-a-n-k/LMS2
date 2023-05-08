const express = require('express');
const router = express();
const { getAllCategories, addCategory, deleteCategory,
    updateCategory, findCategory} = require('../controllers/category')

router.route('/').get(getAllCategories);
router.route('/detail/:id').get(findCategory);

router.route('/add').post(addCategory);
router.route('/update/:id').post(updateCategory);

router.route('/delete/:id').put(deleteCategory);

module.exports = router;