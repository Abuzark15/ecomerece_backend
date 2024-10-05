const express = require('express');
const router = express.Router();

const {verifyuser} = require('../middleware/verifyUser');
const {addItemToCart, viewcart, updateitemquantity, removeitem} = require('../controller/manageCart');

router.post('/addtocart', verifyuser, addItemToCart);
router.get('/viewcart', verifyuser,viewcart );
router.patch('/updatequantity/:productId', verifyuser, updateitemquantity);
router.delete('/removeitem/:productId', verifyuser, removeitem)

module.exports = router;