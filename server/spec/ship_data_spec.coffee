request = require 'request'

describe 'the server, when asked for ship data ', ->
  it 'should respond with hello world', (done) ->
    expect('right').toEqual 'right'
    request 'http://localhost:3000/ships/0', (error, response, body) ->
      expect(body).toEqual '[[100, 100], [125, 85], [150, 100], [125, 50]]'
      done()
