
window.UI = (function(){
  var owedListTemplate, transactionsListTemplate, newTransactonTemplate, $transactionListContainer, 
    $newChargeContainer, $loginContainer, $loginStatus, $amountInput, $descriptionInput;
  
  var transactionsFn = function(data){
    $transactionListContainer.html(transactionsListTemplate(data.transactions));
  };

  var owedFn = function(arr){
    $owedListContainer.html(owedListTemplate(arr));
  }

  var newTransFn = function(data){
    if (data === true){
      $('.transactionStatus').text("Success!");
      $amountInput.val('');
      $descriptionInput.val('');
    }
    else
      $('.transactionStatus').text("Failure!");
  };

  var loginFn = function(data){
    if (data === true){
      $login_container.destroy();
      API.getConnections(function(data){
        $newChargeContainer.html(newTransactonTemplate(data));
      });
    }
    else // failure
      $loginStatus.text("Incorrect login. Please try again.");
  };

  var loginButtonClickEventHandler = function(event){
    var username = $('.loginUsername').val(), password = $('.loginPassword').val();
    API.auth(username, password, Display.loginHandler);
  };

  var submitTransactionClickEventHandler = function(event){
    var amount = $('.amountInput').val(), 
      description = $('.descriptionInput').val(), 
      users = $('.selectInput option:selected').selectedOptions;
    Calculator.createTransaction(amount, description, users, Display.newTransactionCallback);
  };

  var initFn = function(){
    owedListTemplate = Handlebars.compile($('#owedTemplate').html());
    transactionsListTemplate = Handlebars.compile($('#transactionTemplate').html());
    newTransactonTemplate = Handlers.compile($('#newCharge').html());
    $owedListContainer = $('.owedContainer');
    $transactionListContainer = $('.transactionContainer');
    $newChargeContainer = $('.newChargeContainer');
    $loginContainer = $('.loginContainer');
    $loginStatus = $('.loginStatus');
    $amountInput = $('.amountInput');
    $descriptionInput = $('.descriptionInput');

    $(document).on('updateList',Display.transactions);
    $(document).on('updatedOwed',Display.owed);
    $(document).on('click', '.loginButton',loginButtonEventHandler);
    $(document).on('click','.submitInput',submitTransactionClickEventHandler);
  };

  return {
    transactions             : transactionsFn,
    owed                     : owedFn,
    newTransactionCallback   : newTransFn,
    loginHandler             : loginFn,
    init                     : initFn
  }
})();

$(document).ready(UI.init);