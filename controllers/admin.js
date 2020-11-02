const express = require('express');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        mainTitle: 'Add Product',
        path: 'admin/add-product',
        editMode: false
    });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        res.redirect('/')
    }
    const productId = req.params.productId;
    req.user.getProducts({where: {id: productId}})
    // Product.findByPk(productId)
    .then( products => {
        const product = products[0]
        if(!product) {
            return res.redirect('/')
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editMode,
            product
        })
    })
}

exports.postDelelteProduct = (req, res, next) => {
    const id = req.body.prodId
    Product.findByPk(id)
    .then(product => {
        return product.destroy();
    })
    .then(result => {
        console.log(`Product ${id} is deleted`);
        res.redirect('admin/products')
    })
    .catch(err => console.log(err))
}

exports.postEditProduct = (req,res,next) => {
    const id= req.body.id,
        title = req.body.title,
        imgURL = req.body.imgURL,
        desc = req.body.desc,
        price = req.body.price;
        req.user.getProducts({where: {id}})
        // Product.findByPk(id)
        .then(products => {
            const product = products[0]
            product.title = title;
            product.imageUrl = imgURL;
            product.price = price;
            product.description = desc;
        }).catch(err => {
            console.log(err)
        })
        res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
    // Product.findAll()
    req.user.getProducts()
    .then(products => {
        res.render('admin/products', {
            products: products,
            mainTitle: 'Admin Products',
            path: 'admin/products'})
    }).catch(err => {
        console.log(err)
    })
}

exports.postProducts = (req, res, next) => {
    const title = req.body.title,
    imageUrl = req.body.imgURL,
    description = req.body.desc,
        price = req.body.price;
        req.user.createProduct({title, price, imageUrl, description})
        .then(result => {
        console.log('Product added');
        res.redirect('/admin/Products')
    })

    res.redirect('/')
}