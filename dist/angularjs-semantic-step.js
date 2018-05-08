angular.module('angularjsSemanticStep', []);

angular
  .module("angularjsSemanticStep")
  .factory("WizardHandler", function () {
    var wizards = {};

    function addWizard(name, wizard) {
      wizards[name] = wizard;
    }

    function getWizard(name) {
      return wizards[name];
    }

    return {
      addWizard: addWizard,
      getWizard: getWizard
    }
  });

angular
  .module("angularjsSemanticStep")
  .directive('angularjsSemanticStep', ['$timeout', function ($timeout) {

    function getCountOfSteps(stepsCount) {
      switch (stepsCount) {
        case 1: return 'one';
        case 2: return 'two';
        case 3: return 'three';
        case 4: return 'four';
        case 5: return 'five';
        case 6: return 'six';
        case 7: return 'seven';
        case 8: return 'eight';
        case 9: return 'nine';
        case 10: return 'ten';
      }
    }

    return {
      restrict: "EA",
      scope: {
        name: '@',
        steps: '=',
        onStepClick: '&',
        onStepChange: '&'
      },
      templateUrl: './node_modules/angularjs-semantic-ui-step-/dist/angularjs-semantic-step.html',
      controller: ['$scope', 'WizardHandler', function ($scope, wizardHandler) {

        $scope.goto = gotoStep;
        $scope.gotoNext = gotoNext;
        $scope.gotoPrior = gotoPrior;
        $scope._onStepClick = onStepClick;


        function changeTheStep(oldStepNumber, newStepNumber, step) {
          if (oldStepNumber != newStepNumber) {
            if ($scope.onStepChange)
              $scope.onStepChange()(oldStepNumber, newStepNumber, step);
            $scope.currentStepNumber = newStepNumber;
          }
        }

        function reset(resetAll) {
          var items = $scope.steps || [];
          $scope.stepCount = getCountOfSteps(items.length);
          if (resetAll)
            $scope.currentStepNumber = (items.length > 0) ? 1 : 0;
        }

        wizardHandler.addWizard($scope.name, $scope);
        reset(true);

        $scope.$on('stepDataChanged', function () {
          reset(false);
        });

        function gotoStep(newStepNumber) {
          if (newStepNumber > $scope.steps.length || newStepNumber < 0)
            return;

          var oldStepNumber = $scope.currentStepNumber;
          var step = $scope.steps[newStepNumber - 1];
          changeTheStep(oldStepNumber, newStepNumber, step);
        }

        function gotoNext() {
          var oldStepNumber = $scope.currentStepNumber;
          var newStepNumber = oldStepNumber + 1;
          if (newStepNumber > $scope.stepCount)
            newStepNumber = oldStepNumber;

          if (oldStepNumber != newStepNumber)
            gotoStep(newStepNumber);
        }

        function gotoPrior() {
          var oldStepNumber = $scope.currentStepNumber;
          var newStepNumber = oldStepNumber - 1;
          if (newStepNumber == 0)
            newStepNumber = oldStepNumber;

          if (oldStepNumber != newStepNumber)
            gotoStep(newStepNumber);
        }

        function onStepClick(index, step) {
          var newStepNumber = index + 1;
          var oldStepNumber = $scope.currentStepNumber;
          if ($scope.onStepClick)
            $scope.onStepClick()(newStepNumber, step);

          changeTheStep(oldStepNumber, newStepNumber, step);
        }
      }],
      link: function ($scope, element, attrs) {
      }
    }
  }]);
