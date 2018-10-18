angular.module('YASW', [])
  .directive('initialFocus', function() {
    return {
      link: function(scope, element) {
        element[0].focus();
      }
    };
  })
  .directive('gamePolygon', function() {
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
  .directive('gamepadEditor', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<div id="gamepad-editor">' +
          '<h3 id="gamepad-title">YASW Gamepad Configuration' +
          '</h3>' +
          '<table id="gamepad-table">' +
          '<tr>' +
           '<th>Controller</th>' +
           '<th>Thrust</th>' +
           '<th>Fire</th>' +
           '<th>Left</th>' +
           '<th>Right</th>' +
          '</tr>' +
          '<tr>' +
          '<td>blah1</td>' +
          '<td>blah2</td>' +
          '<td>blah3</td>' +
          '<td>blah4</td>' +
          '<td>blah5</td>' +
          '</tr>' +
          '</table>' +
          '</div>'

        // '<div id="no-gamepads-text">' +
        //   'No Gamepads' +
        // '</div>' +
    };
  });
