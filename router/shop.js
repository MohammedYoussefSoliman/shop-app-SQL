const express = require('express');
const router = express.Router();
const shopControls = require('../controllers/shop')

// get home

router.get('/', shopControls.getIndex);
router.get('/product-list', shopControls.getProducts)
router.get('/products', shopControls.getProducts)
// router.get('/products/delete', shopControls.getProducts)
router.get('/products/:id', shopControls.getProduct)
router.get('/orders', shopControls.getOrders)

router.get('/cart', shopControls.getCart)
router.post('/cart', shopControls.postCart)
router.post('/cart-delete-item', shopControls.postCartDeleteItem)
router.post('/create-order', shopControls.postOrder)

router.get('/checkout', shopControls.getCheckout)

module.exports = router