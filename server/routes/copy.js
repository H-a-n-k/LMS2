
const express = require('express');
const router = express();
const { getAllCopies, getAllCopiesByBook,
    addCopy, updateCopy, deleteCopy,
    findCopy } = require('../controllers/copy')

router.route('/').get(getAllCopies);
router.route('/getCopiesByBook/:bookId').get(getAllCopiesByBook);
router.route('/find').get(findCopy);

router.route('/add').post(addCopy);
router.route('/update/:id').post(updateCopy);

router.route('/delete/:id').put(deleteCopy);

module.exports = router;