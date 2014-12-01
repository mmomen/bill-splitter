var auth = function(uid) {
  var firebaseSite = 'https://incandescent-heat-8083.firebaseio.com';
  var firebaseSiteUser = firebaseSite + '/people/' + uid;
  var userData = new Firebase(firebaseSiteUser);
  var appData = new Firebase(firebaseSite);

  var dataObj = {};

  userData.on('value', function(snapshot) {
    dataObj = snapshot.val();
    var data = snapshot.val();
    $.trigger('display', data);
  });

  var getConnections = function(callback) {
    console.log(dataObj.)
  };
  
  var postTransaction = function(obj, user, callback) {

  };
  
  var getName = function(user, callback) {

  };
  
  var auth = function(user, callback) {

  };

  window.API = {
    getConnections: getConnections,
    postTransaction: postTransaction,
    getName: getName,
    auth: auth
  };

  return true;
};