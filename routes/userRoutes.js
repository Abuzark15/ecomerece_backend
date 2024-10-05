const express = require('express');
const router = express.Router();

const userSignup = require('../controller/userSignUp');
const userLogin = require('../controller/userLogin');

router.post('/signup', userSignup);
router.post('/login', userLogin);


module.exports = router;
