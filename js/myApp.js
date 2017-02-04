angular.module('myApp', ['ngMessages', 'ngRoute'])
    //Value block for defining links
    .value('acceptedLinks', ['Home', 'New Meal', 'My Earnings'])    

    //Config block for definitiv the $routeProvder. When first, then first, when second then second etc.
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: './home.html',
            controller: 'HomeCtrl',
            controllerAs: 'vm'
        })
        .when('/new-meal', {
            templateUrl: './new-meal.html',
            controller: 'MealCtrl',
            controllerAs: 'vm',
        })
        .when('/my-earnings', {
            templateUrl: './my-earnings.html',
            controller: 'MealCtrl',
            controllerAs: 'vm',
        })
        .otherwise('/');
    }])

    .controller('HomeCtrl', [function() {

    }])

    .controller('MealCtrl', function($rootScope) { 



        //Validate form and calculate Subtotal, Tip, Total, Meal Count & Average Tip per Meal
        this.submit = function(){

            //Set initial values to 0
            this.subTotal = 0;
            this.tipTotal = 0;
            this.total = 0;
            this.tipGrandTotal = 0;
            this.mealCount = 0;
            this.averageTip = 0;
            
            var grandTotal = 0;


            if( this.userInputForm.$valid ) {
                this.inputComplete = false;
                this.subTotal = this.mealPrice + ((this.taxRate / 100) * this.mealPrice);
                this.tipTotal = ( this.tipPercentage / 100 ) * this.subTotal;
                this.total = this.subTotal + this.tipTotal;
  
                this.mealCount ++;

                this.tipGrandTotal = grandTotal + this.tipTotal;

                grandTotal = this.tipGrandTotal;

                this.averageTip = grandTotal / this.mealCount;

                this.userInputForm.$setPristine();
                this.mealPrice ="";
                this.taxRate ="";
                this.tipPercentage ="";
            } else {
                this.inputComplete = true;
            }
        }

        //Cancel by resetting inputs and error message
        this.cancel = function(){
            this.userInputForm.$setPristine();
            this.mealPrice ="";
            this.taxRate ="";
            this.tipPercentage =""; 
            this.inputComplete = false;
        }

        //Starting over by setting all values back to 0, resetting inputs and error message
        this.startOver = function(){
            this.subTotal = 0;
            this.tipTotal = 0;
            this.total = 0;
            this.tipGrandTotal = 0;
            this.mealCount = 0;
            this.averageTip = 0;
            grandTotal = 0;
            this.inputComplete = false;
            this.mealPrice ="";
            this.taxRate ="";
            this.tipPercentage =""; 
            this.userInputForm.$setPristine(); 
        }
        
        

    });


