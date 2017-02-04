angular.module('myApp', ['ngMessages'])
    .controller('MyCtrl', function($scope) { 
       
        //Set initial values to 0
        this.subTotal = 0;
        this.tipTotal = 0;
        this.total = 0;
        this.tipGrandTotal = 0;
        this.mealCount = 0;
        this.averageTip = 0;
        
        var grandTotal = 0;


        //Validate form and calculate Subtotal, Tip, Total, Meal Count & Average Tip per Meal
        this.submit = function(){
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


