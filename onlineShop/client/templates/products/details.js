Template.productsDetails.events({
  "click #add-to-cart" : function(ev){
    ev.preventDefault();
    addToCart(this.serie, function(err,res){
      Router.go("cartDetails");
    });
  }
});
