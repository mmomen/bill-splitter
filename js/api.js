var auth = function(uid) {
  var firebaseSite = 'https://incandescent-heat-8083.firebaseio.com/people/';
  var firebaseSiteUser = firebaseSite + uid;
  var userData = new Firebase(firebaseSiteUser);

  var dataObj = {};

  userData.on('value', function(snapshot) {
    dataObj = snapshot.val();
    var data = snapshot.val();
    $.trigger('display', data);
  });

  var getConnections = function(callback) {
  };
  
  var postTransaction = function(obj, user, callback) {
    if(arguments.length < 3){
      var callback = user;
      dataObj["transactions"].push(obj);
      userData.set(dataObj);
      return true;
    }else{
      obj["to"] = uid;
      var otherUser = new Firebase(firebaseSite + user + "/transactions");
      var pushTransaction = otherUser.push();
      pushTransaction.set(obj);
      return true;
    }
    callback();
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