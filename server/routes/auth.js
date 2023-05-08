const express = require('express');
const {login} = require('../controllers/auth');
const router = express();

router.route('/login').post(login);

module.exports = router;