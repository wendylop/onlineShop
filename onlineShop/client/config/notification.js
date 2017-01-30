Meteor.startup(function () {

  sAlert.config({
    effect:'',
    position:'top',
    timeout: 5000,
    html: false,
    onRouteClose: true,
    stack:true,
    offset: 0
  });
});
