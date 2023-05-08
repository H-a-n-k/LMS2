const express = require('express');
const router = express();
const { getAllstates } = require('../controllers/state');

router.route('/').get(getAllstates);

module.exports = router;