Template.vendorsDetails.helpers({
	products : function(){
		return Products.find({"vendor.id" : this.id});
	}
});