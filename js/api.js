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
    
  };
  
  var postTransaction = function(obj, user, callback) {
    if (arguments.length === 2) {
      callback = user;
    } else {

    }
    appData.set();
  };

  var createUser = function() {

  };
  
  var getName = function(user, callback) {

  };

  window.API = {
    getConnections: getConnections,
    postTransaction: postTransaction,
    createUser: createUser,
    getName: getName
  };

  return true;
};