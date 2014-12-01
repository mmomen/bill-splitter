$(document).ready(function(){

  window.Display = (function(){
    var owedListTemplate = Handlebars.compile($('#owedTemplate').html()),
      transactionsListTemplate = Handlebars.compile($('#transactionTemplate').html()),
      newTransactonTemplate = Handlers.compile($('#newCharge').html()),
      $owedListContainer = $('.owedContainer'),
      $transactionListContainer = $('.transactionContainer'),
      $newChargeContainer = $('.newChargeContainer'),
      $loginContainer = $('.loginContainer'),
      $loginStatus = $('.loginStatus'),
      $amountInput = $('.amountInput'),
      $descriptionInput = $('.descriptionInput');
    
    var transactionsFn = function(arr){
      $transactionListContainer.html(transactionsListTemplate(arr));
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

    return {
      transactions             : transactionsFn,
      owed                     : owedFn,
      newTransactionCallback   : newTransFn,
      loginHandler             : loginFn
    }
  })();

  window.UI = (function(){
    var transactionListUpdateHandler = function(event,data){
      Display.transactions(data.transactions);
    };

    var owedListUpdateHandler = function(event,data){
      Display.owed(data);
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
      $(document).on('updateList',transactionListUpdateHandler);
      $(document).on('updatedOwed',owedListUpdateHandler);
      $(document).on('click', '.loginButton',loginButtonEventHandler);
      $(document).on('click','.submitInput',submitTransactionClickEventHandler);
    };

    return {
      init : initFn
    }
  })();

  UI.init();

});