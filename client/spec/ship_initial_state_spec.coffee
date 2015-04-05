describe "ShipCommandController initial state", ->
  beforeEach module("YASW")
  scope = undefined
  controller= undefined

  beforeEach inject(($rootScope, $controller) ->
    scope = $rootScope.$new()
    controller= $controller "ShipCommandController",
      $scope: scope
  )

  describe "the ship_points_string()", ->
    it "is an empty string", ->
      expect(scope.ship_points_string()).toEqual('');
