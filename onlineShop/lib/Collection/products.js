Products = new Mongo.Collection("products");

Products.bySerie = function(serie){
  return Products.findOne({serie : serie});
};

Products.featured = function(){
  var featuredSeries = ["Game-of-Thrones","Greys-Anatomy","Breaking-Bad"];
  return Products.find({serie : {$in : featuredSeries}},
  {fields : {inventory : false, cost : false}});
};

Products.allow({
  update : function(userid, product){
    return isAdmin();
  },
  insert : function(userid, product){
    return isAdmin();
  },
  remove : function(userid, product){
    return isAdmin();
  }
});