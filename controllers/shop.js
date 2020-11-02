const express = require('express');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/index', {
            products,
            mainTitle: 'Home',
            path: '/'
        })
    })
}

exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/product-list', {
            products: products,
            mainTitle: 'product list',
            path: '/products'
        })
    })
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.id;
    req.user.getProducts({where: {id: prodId}})
    // Product.findByPk(prodId)
    .then(products => {
        const product = products[0];
        res.render('shop/product-details', {
            product: product,
            mainTitle: product.title,
            path: '/products'
        });
    }).catch(err=>console.log(err));
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        mainTitle: 'Cart',
        path: '/cart'
    })
}
exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let fetchedCart;
    let quantity = 1;
    // Product.findByPk(prodId)
    req.user.getCart()
    .then(cart =>{
        fetchedCart = cart;
        return cart.getProducts({ where: { id: prodId } })
    })
    .then(products => {
        let product;
        if(products.length > 0) {
            product = products[0];
        }
        
        if(product) {
            let oldQuantity = product.cartItem.quantity;
            quantity = oldQuantity + 1;
            return product
        }
        return Product.findByPk(prodId)
    })
    .then(product => {
        fetchedCart.addProduct(product, {through: {quantity}})
    })
    .catch(err=>console.log(err));

    res.redirect('/cart');
}

exports.postOrder = (req, res, next) => {
    let fetchedCart;
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart;
        return cart.getProducts()
    })
    .then(products => {
        return req.user.createOrder()
        .then(order => {
            order.addProducts(products.map(product => {
                product.orderItem = {quantity: product.cartItem.quantity}
                return product;
            }))
        })
    })
    .then( result => {
        return fetchedCart.setProducts(null); // this resets the cart page
    })
    .then( result => {
        res.redirect('/orders');
    })
    .catch(err=>console.log(err))
}

exports.getOrders = (req, res, next) => {
    req.user.getOrders({include: ['products']})
    .then(orders => {
        console.log(orders)
        res.render('shop/orders', {
          path: '/orders',
          pageTitle: 'Your Orders',
          orders
        });
    })
    .catch(err=>console.log(err))
  };

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        mainTitle: 'Checkout',
        path: '/checkout'
    })
}

exports.getCart = (req, res, next) =>{

    req.user.getCart()
    .then(cart => {
        return cart.getProducts()
        .then(products => {
            res.render('shop/cart', {
            path: '/cart',
            mainTitle: 'Your Cart',
            products
            });
        }).catch(err => console.log(err))
    })
    .catch(err=>console.log(err))
    // Cart.getCart(cart => {
    //     Product.findAll()
    //     .then(products => { // this gets all stored products
    //         const cartProducts = []
            
    //         for(product of products) {
    //             const cartProductData = cart.products.find(prod => prod.id === product.id) // foreach product fetched 'all stored products' find which product with id matches one in the cart products array.
    //             if(cartProductData) {
    //                 cartProducts.push({productData: product, qty: cartProductData.qty})
    //             }
    //         }

    //         res.render('shop/cart', {
    //             path: '/cart',
    //             mainTitle: 'Your Cart',
    //             products: cartProducts
    //         });
    //     });
    // });
}

exports.postCartDeleteItem = (req, res, next) => {
    const id = req.body.productId;
    req.user.getCart()
    .then(cart => {
        return cart.getProducts({where: {id}})
    })
    .then(products => {
        const product = products[0];
        return product.cartItem.destroy()
    })
    .then(results => {
        res.redirect('/cart')
    })
    .catch(err=>console.log(err))
    // Product.findByPk(prodId).then(product => {
    //     Cart.deleteProductById(prodId, product.price)
    //     res.redirect('/cart')
    // })
}