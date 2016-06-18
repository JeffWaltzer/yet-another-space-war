var meta= require('./meta');
var underscore= require('underscore');
var transforms= require('./transform');
var vector= require('./vector');

var ScreenObject = function(initial_state) {
    this.game= initial_state.game;
    this.points= initial_state.points;
    this._position = new vector.Vector(initial_state.position || [0, 0]);
    this.debug= initial_state.debug || false;
    this.velocity= new vector.Vector(initial_state.velocity || [0,0]);
    this._player= initial_state.player;

    this.update_outline();
};
exports.ScreenObject= ScreenObject;

ScreenObject.method= function(name, body) {
    ScreenObject.prototype[name]= body;
    return body;
};

ScreenObject.method('position',
		    function(new_value) {
			if (typeof new_value !== 'undefined') {
			    this._position = new_value;
			    this.update_outline();
			}
			return this._position;
		    });

ScreenObject.method('ignores_collisions',
		    function() { return false; });

ScreenObject.method('ship_to_game_transform',
		    function() { return transforms.make_translation(this._position); });

ScreenObject.method('generate_outline',
		    function() {
			var self = this;

			this.bounding_box = false;

			var composite_transform = this.ship_to_game_transform();
			var returned_points = underscore.map(this.points,
							     function(p) {
								 var rv = [0, 0, 0];
								 transforms.apply_transform(rv, composite_transform, p);
								 var x = (rv[0] / rv[2]);
								 var y = (rv[1] / rv[2]);
								 if (self.bounding_box) {
								     if (x > self.bounding_box.right )  self.bounding_box.right = x;
								     if (x < self.bounding_box.left )  self.bounding_box.left = x;
								     if (y > self.bounding_box.top )  self.bounding_box.top = y;
								     if (y < self.bounding_box.bottom )  self.bounding_box.bottom = y;
								 } else {
								     self.bounding_box = {};
								     self.bounding_box.left = self.bounding_box.right = x;
								     self.bounding_box.top = self.bounding_box.bottom = y;
								 }
								 return [x, y];
							     });
			return returned_points;
		    });

ScreenObject.method('update_outline',
		    function() { this.outline_cache = this.generate_outline(); });

ScreenObject.method('is_bullet',
		    function () { return false; });

ScreenObject.method('is_fragment',
		    function () { return false; });

ScreenObject.method('is_ship',
		    function () { return false; });

ScreenObject.method('outline',
		    function() { return this.outline_cache; });

ScreenObject.method('update',
		    function(tick_rate) {
			this._position.add_to(this.velocity.divide(tick_rate));
			this._position.clip_to(this.game.game_field.field_size());
			this.update_outline();
		    });

ScreenObject.method('live',
		    function() { return true; });

ScreenObject.method('score',
		    function() { return 0; });

ScreenObject.method('lines',
		    function () {
			var result = [];
			var transform_points = this.outline();
			for(var i = 0; i< transform_points.length; i++) {
			    result.push([
				transform_points[i],
				transform_points[(i+1) % transform_points.length]
			    ]);
			}
			return result;
		    });

ScreenObject.method('player',
		    function(new_value) {
			if (new_value !== undefined)
			    this._player= new_value;
			return this._player;
		    });

ScreenObject.method('make_game_piece',
		    function() {
			return {
			    outline: this.outline(),
			    id: this.id,
			    score: this.score(),
			    position: [
				this.position().x(),
				this.position().y()
			    ]
			};
		    });

ScreenObject.method('explode',
		    function() {});

