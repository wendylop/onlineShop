'use strict';

Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: '404'
});

Router.route('/', function () {
    this.render('products');
});

Router.route('/about', function () {
    this.render('about');
});

Router.route('/products/:id', function () {
    var that = this;
    var product = _.find(Products, function (prod) {
        return (prod.id === that.params.id);
    });
    this.render('productDetail', {
        data: product
    });
});