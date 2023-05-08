const express = require('express');
const router = express();
const {getAllCards, addCard, updateCard, countCard, findCard, blockCard} = require('../controllers/card')

router.route('/').get(getAllCards)
router.route('/count').get(countCard)
router.route('/detail/:id').get(findCard);

router.route('/add').post(addCard);
router.route('/update/:id').post(updateCard);
router.route('/block/:id').post(blockCard);

module.exports = router;