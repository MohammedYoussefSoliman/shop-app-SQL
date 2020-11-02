const express = require('express');


exports.errorHandle = (req, res, next) => {
    res.status(404).render('404', {mainTitle: 'Not Found', path: '/404'})
}