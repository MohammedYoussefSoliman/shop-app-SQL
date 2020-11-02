const express = require('express');
const router = express.Router();
const adminControls = require('../controllers/admin')


// get products

router.get('/products', adminControls.getProducts)

// get add-products

router.get('/add-product', adminControls.getAddProduct)

//edit product
router.get('/edit-product/:productId', adminControls.getEditProduct)
router.post('/edit-product', adminControls.postEditProduct)

// post products

router.post('/add-product', adminControls.postProducts)

// delete product

router.post('/delete-product', adminControls.postDelelteProduct)


module.exports = router