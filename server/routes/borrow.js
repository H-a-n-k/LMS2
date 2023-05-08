const express = require('express');
const router = express();
const { getAllBorrows, findBorrowById, findBorrowByCardAndCopy,
    addBorrow, returnBook, findBorrowByCard, countBorrow} = require('../controllers/borrow')

router.route('/').get(getAllBorrows);
router.route('/count').get(countBorrow);
router.route('/detail/:id').get(findBorrowById);
router.route('/findByCardAndCopy/').get(findBorrowByCardAndCopy);
router.route('/findBorrowByCard/:cardId').get(findBorrowByCard);

router.route('/add').post(addBorrow);
router.route('/returnBook/:id').post(returnBook);
module.exports = router;