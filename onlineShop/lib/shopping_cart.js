if(Meteor.isClient){


  //the cart relies on this global key, which could be a problem!
  //refactor as you see fit!
  userKey = localStorage.getItem("user_key");
  if(!userKey){
    userKey = Meteor.uuid();
    localStorage.setItem("user_key", userKey);
  }

  getCart = function(next){
    Meteor.call("getCart", next);
  };

  addToCart = function (serie, callback) {
    Meteor.call('addToCart',userKey, serie, callback);
  };
  removeFromCart = function (serie, callback) {
    Meteor.call('removeFromCart',userKey, serie, callback);
  };
  updateCart = function (serie, quantity, callback) {
    Meteor.call('updateCart', userKey, serie, quantity, callback);
  };
}

if(Meteor.isServer){
  Meteor.methods({
    //getcart
    getCart : function(userKey){
      check(userKey, String);
      return Carts.getCart(userKey);
    },
    updateCart : function(userKey,serie, quantity){
      check(userKey, String);
      check(serie, String);
      check(quantity, Match.Where(function(quantity) {
        check(quantity, Number);
        return quantity >= 0;
      }));
      var cart = Meteor.call("getCart", userKey);
      //only update the quantity here
      _.each(cart.items, function(item){
        if(item.serie === serie){
          item.quantity = quantity;
          return Meteor.call("saveCart", cart);
        }
      });
    },
    //addToCart
    addToCart : function(userKey, serie){
      check(userKey, String);
      check(serie, String);
      var cart = Meteor.call("getCart", userKey);
      //get the item in the cart
      var found = _.find(cart.items, function(item){
        return item.serie === serie;
      });

      if(found){
        found.quantity++;
      }else{
        //add the item
        var product = Products.bySerie(serie);
        var item = {
          serie : product.serie,
          name : product.name,
          price : product.price,
          description : product.summary,
          image : product.image,
          discount : 0,
          added_at : new Date(),
          quantity : 1
        };
        cart.items.push(item);

      }
      cart.notes.push({
        note : serie + " added to cart",
        created_at : new Date()
      });
      //save it
      Meteor.call("saveCart", cart);
      return cart;
    },
    //removeFromCart
    removeFromCart : function(userKey, serie){
      check(userKey, String);
      check(serie, String);
      var cart = Meteor.call("getCart", userKey);
      //get the item in the cart

      var found = _.find(cart.items, function(item){
        return item.serie === serie;
      });

      if(found){
        var foundIndex = cart.items.indexOf(found);
        cart.items.splice(foundIndex,1);
        cart.notes.push({
          note : serie + " removed from cart",
          created_at : new Date()
        });
        Meteor.call("saveCart", cart);
      }

      return cart;
    },

    saveCart : function(cart){
      check(cart, Match.ObjectIncluding({
        userKey: String,
        items: [Match.ObjectIncluding({
          serie: String
        })]
      }));

      var products = Products.find({
        serie: {$in: _.pluck(cart.items, 'serie')}
      }).fetch();

      var serieMap = _.object(_.pluck(products, 'serie'), products);

      cart.updated_at = new Date();
      cart.total = 0;
      var counter = 0;
      _.each(cart.items, function(item){
        item.price = serieMap[item.serie].price;
        item.quantity = Math.max(0, item.quantity);
        // TODO: Don't trust discount from client
        item.lineTotal = (item.price - item.discount) * item.quantity;
        cart.total+=item.lineTotal;
        counter++;
      });
      cart.itemCount = counter;
      Carts.update({userKey : cart.userKey}, cart, {upsert : true});
      return cart;
    },

    emptyCart : function(userKey){
      check(userKey, String);
      Carts.remove({userKey : userKey});
    }
  });
}
