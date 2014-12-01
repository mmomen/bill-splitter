var firebaseSite = 'https://incandescent-heat-8083.firebaseio.com/';
var myDataRef = new Firebase(firebaseSite);

// myDataRef.on('child_added', function() {
//   var message = snapshot.val();
//   displayStuff(message.name, message.text);
// });

// function displayStuff(name, text) {
//   console.log("Name " + name);
//   console.log("Text " + text);
// }

console.log(myDataRef);