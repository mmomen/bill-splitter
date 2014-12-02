$(document).on("updateList", function (person){
  var trans = Calculator.getSimplifiedTransactions(person);
  $(document).trigger("updateOwed", trans);
});

window.Calculator= (function(){

  var getSimplifiedTransactions = function (person) {
    var name = person["name"];
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
      var name = API.getName(uid);
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


    var createTransaction  = function (amount, description, users, callback){
      var amountPerUser = amount/(users.length);
      
      var paidObj = { 
        type: "paid",
        amount: amount,
        description: description,
        users: users
      }

      users.forEach ( function (v,i,a) {
        var oweObj = {
          type: "iOwe",
          amount: amountPerUser,
          description: description
        }

        API.postTransaction(oweObj) // pass objects with people who owe's info
      })

      API.postTransaction(paidObj, users); // passes object with person who paid's info
      
      callback();

    }


    return {
      createTransaction: createTransaction,
      getSimplifiedTransactions: getSimplifiedTransactions
    }

})();




// TEST PERSON OBJECT AND CALL//
// var uid1 = { 
//     name: "Alice",
//     transactions: [
//         {type: "paid",
//         amount: 10,
//         users: [12346, 12347]},
//         {type: "iOwe",
//         amount: 15,
//         to: 12346}
//         ]};
        
// getSimplifiedTransactions(uid1)
