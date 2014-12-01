var getSimplifiedTransactions = function (person) {
  var name = person["un"];
  var transactionsArray = person["transactions"];
  var paymentsArray = [];


    var checkPastTransactions = function (uid, amount) {
        var isNotUnique = false;
        paymentsArray.forEach(function (v,i,a){
            if (v["uid"] === uid) {
                v["amount"] += amount;
                isNotUnique = true;
            }
        })
     return isNotUnique;
    }
    
  var addToUser = function (uid, amount) {
    // var name = "";
    var name = API.get_name(uid);
    if (!name){
      name = "(not found)";
    }
    
    var paymentsArrayLength = paymentsArray.length;
    if (paymentsArrayLength > 0) {
        if (!checkPastTransactions(uid, amount)) {
            paymentsArray.push({
            uid: uid,
            name: name,
            amount: amount       
            });
        }
    } else {
        paymentsArray.push({
            uid: uid,
            name: name,
            amount: amount       
            });
    }

  };
  
  transactionsArray.forEach( function (object) {
    if (object["type"] === "paid") {
      var amountPerUser = object["amount"]/(object["users"].length);
      object["users"].forEach(function (user) {
            addToUser(user, amountPerUser);
        });
    } else if (object["type"] === "iOwe") {
      addToUser(object["to"], -object["amount"]);
    }
  });

  return paymentsArray;
};




// TEST PERSON OBJECT AND CALL//
var person1 = { 
    uid: 12345,
    name: "Alice",
    transactions: [
        {type: "paid",
        amount: 10,
        users: [12346, 12347]},
        {type: "iOwe",
        amount: 15,
        to: 12346}
        ]};
        
getSimplifiedTransactions(person1)
