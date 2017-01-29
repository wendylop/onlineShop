//'use strict';

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: '404',
    //waitOn: function() { return Meteor.subscribe('Products'); }
});

//Router.router('/', {
  //name : 'homeIndex',
  //data : function (){
   // return{
    //  message : 'Welcome to te TV-Serie Shop'
    //}
  //}
//});


Router.route('/one/:userText', function () {
    this.render('page1', {
          data:{
            SomeText:this.params.userText
          }  
        //data:function(){return Item.findOne({_id: this.params._id});}
    });
});

Router.route('/', {
    name: "home"
});

Router.route('/about', {
    name: "About"
});

Router.route('/contact', {
    name: "Contact"
});

Router.route("/products/:serie", {
  name : "productsDetails",
  data : function(){

    return Products.findOne({serie : this.params.serie});
 
}
});

Router.route("/vendors/:slug", {
  name : "vendorsDetails",
  data : function(){

    return Vendors.findOne({slug : this.params.slug});
 
}
});


//Router.route('/products/:_id', 
 //   function () {
 //   var that = this;
  //  var product = find(Products, function (prod) {
   //     return (prod ._id === that.params._id);
   // });
   // this.render('productDetail', {
   //     data: product
   // });
//});

//Router.route('/productDetail/_id', function () {
 //   this.render('productsDetail');
//});

        //name: 'productDetail',
        //data: function() { return Products.findOne(this.params._id); }
 
