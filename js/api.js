var auth = function(uid, callback){
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
    return dataObj.connections;
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
  
  var getConnectionName = function(user, callback) {
    var connectionNameObj = new Firebase(firebaseSite+user);
    connectionNameObj.on('value', function(snapshot){
      var snapshotValue = snapshot.val()
      callback(snapshotValue.name);
    })
  };

  var createUser = function(username, password) {
    var uid = Math.floor( (Math.random() * (99999 - 10000) + 10000) );
    var newUserRef = new Firebase(firebaseSite+uid);
    newUserRef.set({name: username});
  };

  window.API = {
    getConnections: getConnections,
    postTransaction: postTransaction,
    createUser: createUser,
    getName: getConnectionName
  };

  callback();
  return true;
};


