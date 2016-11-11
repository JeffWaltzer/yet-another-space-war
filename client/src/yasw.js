angular.module('YASW', [])
  .directive('initialFocus', function() {
    return {
      link: function(scope, element) {
        element[0].focus();
      }
    };
  })
  .directive('screenObject', function() {
    return {
      replace: true,
      template: '<polygon' +
        ' ng-attr-points="{{screen_object.polygon_string}}"' +
        ' ng-attr-stroke="{{screen_object.color}}"' +
        ' stroke-width="2"' +
        ' fill="none"' + 
        '/>'
    };
  });
