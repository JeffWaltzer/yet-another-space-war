angular.module('YASW', [])
  .directive('initialFocus', function () {
    return {
      link: function (scope, element) {
        element[0].focus();
      }
    };
  })
  .directive('gamePolygon', function () {
    return {
      restrict: 'E',
      replace: true,
      template: '' +
        '<g>' +
        '  <polygon' +
        '   ng-attr-points="{{polygon.polygon_string}}"' +
        '   ng-attr-stroke="{{polygon.color}}"' +
        '   stroke-width="2"' +
        '   fill="none"' +
        '  />' +
        '  <text' +
        '   ng-if="polygon.score"' +
        '   ng-attr-x="{{polygon.position[0]}}"' +
        '   ng-attr-y="{{polygon.position[1] - 20}}"' +
        '   ng-attr-fill="{{polygon.color}}">' +
        '  {{polygon.score}}' +
        '  </text>' +
        '</g>'
    };
  })
  .directive('gamepadEditor', function () {
    return {
      restrict: 'E',
      replace: true,
      template:
        '<div id="gamepad-editor">' +
          '<div ng-if="gamepads.length <= 0" id="no-gamepads-text">' +
            'No Gamepads' +
          '</div>' +
          '<div ng-repeat="gamepad in gamepads">' +
            '<div class="gamepad-name" >' +
              '{{gamepad.id}}' +
            '</div>' +
            '<div class="gamepad-thrust-button" >' +
              '3' +
            '</div>' +
          '</div>' +
        '</div>'
    };
  });
