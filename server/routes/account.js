const express = require('express');
const router = express();
const { getAllAccounts, logIn, createUser,
    findUserById, updateUser, blockUser, changePassword } = require('../controllers/account')
router.route('/').get(getAllAccounts)
router.route('/find/:id').get(findUserById);

router.route('/login').post(logIn);
router.route('/create').post(createUser);
router.route('/update/:id').post(updateUser);
router.route('/block/:id').post(blockUser);
router.route('/changePassword/:id').post(changePassword);
module.exports = router;