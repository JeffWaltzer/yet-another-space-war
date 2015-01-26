(function() {
  var request;

  request = require('request');

  describe('the server, when asked for ship data ', function() {
    return it('should respond with hello world', function(done) {
      expect('right').toEqual('right');
      return request('http://localhost:3000/ships/0', function(error, response, body) {
        expect(body).toEqual('[[100, 100], [125, 85], [150, 100], [125, 50]]');
        return done();
      });
    });
  });

}).call(this);
