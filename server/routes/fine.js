const express = require('express');
const router = express();
const { getAllFines, getAllFinesByCard, payFine } = require('../controllers/fine')

router.route('/').get(getAllFines);
router.route('/findByCard/:cardId').get(getAllFinesByCard);

router.route('/payFine/:id').put(payFine);

module.exports = router;