var firebaseSite = 'https://incandescent-heat-8083.firebaseio.com/';
//var firebaseSiteUser = 'https://incandescent-heat-8083.firebaseio.com/people/' + userId + '.json';
var myDataRef = new Firebase(firebaseSite);

myDataRef.on('child_added', function(snapshot) {
  var message = snapshot.val();
  displayStuff(message);
});

function displayStuff(obj) {
  for (var user in obj) {
    console.log(user);
    console.log(obj[user].name);
  }
}