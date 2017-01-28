Products = new Mongo.Collection("products");

Products.featured = function(){
  var featuredSerie = ["Game-of-Thrones","Greys-Anatomy","Narcos"];
  return Products.find({serie : {$in : featuredSerie}},
  {fields : {inventory : false, cost : false}});
};

