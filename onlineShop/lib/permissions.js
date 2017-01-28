isAdmin = function(){
  var loggedInUser = Meteor.user();
  var result = false;
  if(loggedInUser){
    if (Roles.userIsInRole(loggedInUser, ['Administrator'])){
      result = true;
    }
  }
  return result;
};

//Admin opction
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
