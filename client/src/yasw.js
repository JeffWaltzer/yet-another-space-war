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
      restrict: 'E',
      replace: true,
      template: '<polygon' +
        ' ng-attr-points="{{screen_object.polygon_string}}"' +
        ' ng-attr-stroke="{{screen_object.color}}"' +
        ' stroke-width="2"' +
        ' fill="none"' + 
        '/>'
    };
  })
  .directive('score', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<text' +
        ' ng-if="screen_object.score"' +
        ' ng-attr-x="{{screen_object.position[0]}}"' +
        ' ng-attr-y="{{screen_object.position[1] - 20}}"' +
        ' ng-attr-fill="{{screen_object.color}}">' +
        '{{screen_object.score}}' +
        '</text>'
    };
  });
