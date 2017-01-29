Products = new Mongo.Collection("products");

Products.featured = function(){
  var featuredSerie = ["Game-of-Thrones","Greys-Anatomy","Breaking-Bad"];
  return Products.find({serie : {$in : featuredSerie}},
  {fields : {inventory : false, cost : false}});
};

