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
            controller: 'EarningsCtrl',
            controllerAs: 'vm',
        })
        .otherwise('/');
    }])

    .controller('HomeCtrl', function($rootScope) {
        $rootScope.tipGrandTotal = 0;
        $rootScope.mealCount = 0;
        $rootScope.averageTip = 0; 
    })

    //$rootScope has to be injected in the function to work
    .controller('MealCtrl', function($rootScope) { 

        //Validate form and calculate Subtotal, Tip, Total, Meal Count & Average Tip per Meal
        this.submit = function(){
            //Set initial values to 0
            this.subTotal = 0;
            this.tipTotal = 0;
            this.total = 0;
            this.tipGrandTotal = 0;
            this.averageTip = 0;


            //Check if form is valid and then calculate all values
            if( this.userInputForm.$valid ) {
                
                //hide error message
                this.inputComplete = false;
                
                //CALCULATE CUSTOMER CHARGES//
                    //Calculate subtotal of one order based on mealprice & tax rate
                    this.subTotal = this.mealPrice + ((this.taxRate / 100) * this.mealPrice);
                    
                    //Calculate tip of one order based on subtotal + tipPercentage
                    this.tipTotal = ( this.tipPercentage / 100 ) * this.subTotal;
                    
                    //Calculate total of customer charges for one order based on subtotal + tip
                    this.total = this.subTotal + this.tipTotal;


                //CALCULATE ROOTSCOPE VALUES TO MOVE TO MYEARNINGS//
                    //Count the number of meals
                    $rootScope.mealCount ++;

                    //Variable to hold the new total of all tips
                    $rootScope.tipGrandTotal = $rootScope.tipGrandTotal + this.tipTotal;
                    console.log($rootScope.tipGrandTotal);

                    //Calculate the average tip based on grand Total & mealcount
                    $rootScope.averageTip = $rootScope.tipGrandTotal / $rootScope.mealCount;

                //Set initial values back to zero
                this.userInputForm.$setPristine();
                this.mealPrice ="";
                this.taxRate ="";
                this.tipPercentage ="";
           
            } else {
                //show error message if user form not validated
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

    })



    //$rootScope has to be injected in the function to work
    .controller('EarningsCtrl', function($rootScope) { 

        //Set this.tipGrandTotal with the value from the rootscope to be shown in the earnings view
        this.tipGrandTotal = $rootScope.tipGrandTotal; 

        //Set this.averageTip with the value from the rootscope to be shown in the earnings view
        this.averageTip = $rootScope.averageTip; 

        //Set this.mealCount with the value from the rootscope to be shown in the earnings view
        this.mealCount = $rootScope.mealCount;

        //Starting over by setting all values back to 0, resetting inputs and error message
        this.startOver = function(){
            $rootScope.tipGrandTotal = 0;
            $rootScope.mealCount = 0;
            $rootScope.averageTip = 0; 
        }

    });