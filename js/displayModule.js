$(document).ready(function(){

  window.Display = (function(){
    owed_list_template = Handlebars.compile($('#owed-template').html());
    transactions_list_template = Handlebars.compile($('#transaction-template').html());
    $owed_list_container = $('.owed-container');
    $transaction_list_container = $('.transaction-container');
    $new_charge_container = $('.new-charge-container');
    $login_container = $('.login-container');
    
    var transactionsFn = function(arr){
      $transaction_list_container.html(transactions_list_template(arr));
    };

    var owedFn = function(arr){
      $owed_list_container.html(owed_list_template(arr));
    }

    return = {
      transactions : transactionsFn,
      owed         : owedFn
    }
  })();

});


var transactionListUpdateHandler = function(event,data){
  Display.transactions(data);
};

var owedListUpdateHandler = function(event,data){
  Display.owed(data);
};

var loginButtonClickEventHandler = function(event){
  var username = $('.login-username').val(), password = $('.login-password').val();
  API.auth(username, password, Display.login_handler);
};

var submitTransactionClickEventHandler = function(event){
  var amount = $('.amount-input').val(), 
    description = $('.description-input').val(), 
    users = $('.select-input option:selected').selectedOptions;
  Calculator.create_transaction(amount, description, users, Display.new_transaction_handler);
};

var init = function(){
  $(document).on('update_list',transactionListUpdateHandler);
  $(document).on('updated_owed',owedListUpdateHandler);
  $(document).on('click', '.login-button',loginButtonEventHandler);
  $(document).on('click','.submit-input',submitTransactionClickEventHandler);
};

$(document).ready(init);