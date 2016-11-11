angular.module('YASW', [])
  .directive('initialFocus', function() {
    return {
      link: function(scope, element) {
        element[0].focus();
      }
    };
  });
