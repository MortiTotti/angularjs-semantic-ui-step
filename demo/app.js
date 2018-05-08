(function () {
  var app = angular.module('app', ['angularjsSemanticStep']);

  app.controller('home', ['$scope', '$timeout', 'WizardHandler', home]);

  function home($scope, $timeout, wizardHandler) {

    $scope.stepItems = [
      {
        title: 'item 1',
        hasDescription: true,
        description: 'some data',
        hasStepNumber: true,
        hasIcon: false,
        icon: 'payment',
        isDisable: false,
      },
      {
        title: 'item 1',
        hasDescription: true,
        description: 'some data',
        hasStepNumber: true,
        hasIcon: false,
        icon: 'payment',
        isDisable: false,
      },
      {
        title: 'item 1',
        hasDescription: true,
        description: 'some data',
        hasStepNumber: true,
        hasIcon: false,
        icon: 'payment',
        isDisable: false,
      }];


    $scope.onStepClicked = function (stepNo, step) {
    }

    $timeout(init(), 0);
    init();

    function init() {
      $scope.currentStep = 1;
    }

    $scope.onStepChanged = function (oldStepNumber, newStepNumber, newStep) {
      $scope.currentStep = newStepNumber;
      console.log(oldStepNumber, newStepNumber, newStep);
    }

    $scope.goto = function(stepnumber) {
      wizardHandler.getWizard('mywizard').goto(stepnumber);
    }

    $scope.gotoNext = function() {
      wizardHandler.getWizard('mywizard').gotoNext();
    }

    $scope.gotoPrior = function() {
      wizardHandler.getWizard('mywizard').gotoPrior();
    }
    
    $scope.addStep = function () {
      var s = {
        hasIcon: true,
        title: 'item 3',
        icon: 'dollar',
        isDisable: false,
        hasDescription: true,
        description: 'some data 23 2'
      };

      $scope.stepItems.push(s);
      $scope.$broadcast('stepDataChanged');
    }
  }
}())
