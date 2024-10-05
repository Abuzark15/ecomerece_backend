const express = require('express');
const router = express.Router();

const {placeOrder, viewsorderbyid, viewallorder} = require('../controller/manageOrder');
const {verifyuser} = require('../middleware/verifyUser');

router.post('/placeorder', verifyuser,  placeOrder);
router.get('/vieworder/:id', verifyuser, viewsorderbyid);
router.get('/viewallorder', verifyuser, viewallorder);


module.exports = router;

