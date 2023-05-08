
const express = require('express');
const router = express();
const { getAllBooks, getSearchHints,
    findBookById, addBook, updateBook,
    deleteBook, getPopularBooks, countBook} = require('../controllers/book')

router.route('/').get(getAllBooks);
router.route('/count').get(countBook);
router.route('/detail/:id').get(findBookById);
router.route('/searchHint').get(getSearchHints);
router.route('/popular').get(getPopularBooks);

router.route('/addBook').post(addBook);
router.route('/updateBook/:id').post(updateBook);

router.route('/deleteBook/:id').put(deleteBook);

module.exports = router;