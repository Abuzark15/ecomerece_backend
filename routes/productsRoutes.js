const express = require('express');
const router = express.Router();

const {verifyuser} = require('../middleware/verifyUser')
const {upload, createproduct, updateProduct, deleteProduct} = require('../controller/manageProduct');


router.post('/create', verifyuser,upload.single('image'), createproduct);
router.patch('/update/:id', verifyuser, upload.single('image'), updateProduct);
router.delete('/delete/:id', verifyuser, deleteProduct);

module.exports = router;    