
const express = require('express');
const router = express();
const {getList, add, getOne, update} = require('../controllers/emp')

router.route('/').get(getList);
router.route('/detail/:id').get(getOne);

router.route('/add').post(add);
router.route('/update/:id').post(update);

module.exports = router;