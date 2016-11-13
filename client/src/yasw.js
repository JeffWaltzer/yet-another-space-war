angular.module('YASW', [])
  .directive('yasw:initial-focus', function() {
    return function(scope, element){
      element[0].focus();
    };
  });

