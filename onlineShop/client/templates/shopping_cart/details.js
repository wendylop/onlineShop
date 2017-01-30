Template.cartDetails.helpers({
  cart : function(){
    currentCart = Carts.getCart(userKey);
    return currentCart;
  },
  thereAreNo : function(items){
    return items.length == 0;
  }
});

Template.cartDetails.events({
  "click .remove-from-cart" : function(ev){
    ev.preventDefault();
    removeFromCart(this.serie, function(err,res){
      if(err){
        console.log(err);
      }else{
        //any items left?
        if(currentCart.items.length === 0){
          Router.go("home");
        }
      }
    });
  },
  "change .item-qty" : function(ev){
    var rawValue = $(ev.currentTarget).val();

    if(!isNaN(rawValue)){
      var newQty = parseInt(rawValue);
      var name = this.name;
      if(newQty === 0){
        removeFromCart(this.serie);
      }else {
        this.quantity = parseInt(newQty);
        updateCart(this.serie,this.quantity, function (err, res) {
          if (err) {
            //console.log(err);
            sAlert.error(err);
          } else {
            //alert(name + " updated");
            sAlert.success(name + " updated");
          }
        });
      }
      //just to be sure
      $(ev.currentTarget).val(newQty);
    }else{
      sAlert.error("That's not a number...");
    }
  }
});
