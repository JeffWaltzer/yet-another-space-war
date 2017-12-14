var vector= require('./vector');
var transforms= require('./transform');
var screen_object = require('./screen_object');
var util = require('util');
var math_util = require('./math_util');
var fragment_maker = require('./fragment_maker');
var Polygon=require('./polygon').Polygon;
var Player=require('./player').Player;

function Ship(initial_state) {
  initial_state.shape = [ new Polygon([[-10, 10], [20, 0], [-10, -10], [0, 0]]) ];

  initial_state.mass = 1.0;

  screen_object.ScreenObject.call(this, initial_state);

  this.raw_gun_point = new vector.Vector([21, 0]);

  this.rotation = initial_state.rotation || 0;
  this.acceleration= initial_state.acceleration || 0;
}

util.inherits(Ship, screen_object.ScreenObject);

Ship.rotation_rate= 1;

Ship.prototype.on_message = function(json_message) {
  var message = JSON.parse(json_message);

  switch (message.command) {
  case 'rotate_left':
    this.angular_velocity(-Ship.rotation_rate);
    break;
  case 'rotate_right':
    this.angular_velocity(Ship.rotation_rate);
    break;
  case 'rotate_stop':
    this.angular_velocity(0);
    break;
  case 'thrust_on':
    this.acceleration = 30;
    break;
  case 'thrust_off':
    this.acceleration = 0;
    break;
  case 'fire':
    this.fire();
    break;
  case 'clone':
    this.clone();
    break;
  case 'stop-screen-updates':
    this.stop_screen_updates();
    break;
  }
};


Ship.prototype.update= function(tick_rate) {
  Ship.super_.prototype.update.call(this, tick_rate);
  this.velocity().add_to(new vector.Vector({magnitude: this.acceleration / tick_rate,
                                          heading: this.heading}));
};



Ship.prototype.gun_point= function() {
  var transformed_point= [0,0,1];
  transforms.apply_transform(transformed_point, this.to_game_space(), this.raw_gun_point.coordinates);
  return new vector.Vector(transformed_point);
};

Ship.prototype.explode = function() {
  if (this._exploded) return;
  this._exploded=true;
  var the_player = this.player();
  var game_field = this.game_field;

  Ship.super_.prototype.explode.call(this);
  this.player(null);
  the_player.ship = null;

  the_player.arrange_for_resurrection(game_field);

  return fragment_maker.add_fragments(this.game_field, this.position(), this.velocity());
};

Ship.prototype.fire= function(debug){
  var bullet_parameters= {
    game_field: this.game_field,
    life_left: Ship.bullet_lifetime,
    position: this.gun_point().coordinates,
    velocity: [this.velocity().x() + Ship.bullet_speed * Math.cos(this.heading),
               this.velocity().y() + Ship.bullet_speed * Math.sin(this.heading)],
    ship: this,
    player: this.player()
  };

  return this.game_field.add_bullet(bullet_parameters);
};

Ship.prototype.clone= function() {
    if (!this.game_field)
        return;

    var heading= math_util.random_in_range(0, 2*Math.PI);
    var speed= math_util.random_in_range(0, 50);
    this.game_field.add_ship({heading: heading,
                              velocity: [speed*Math.cos(heading),
                                         speed*Math.sin(heading)]});
};

Ship.prototype.is_ship = function() {
  return true;
};

Ship.prototype.score= function() {
  if (!this.player())
    return null;
  return this.player().score();
};

Ship.prototype.point_value= function() {
  return this._exploded ? 0: 1;
};

Ship.prototype.shape= function(new_value) {
    var ship_shape= screen_object.ScreenObject.prototype.shape.call(this, new_value);

    if (this.acceleration > 0)
        return [ship_shape[0],  new Polygon([[-5, 0], [-10, 5], [-20, 0], [-10, -5]], 'red')];

    return ship_shape;
};

Ship.prototype.stop_screen_updates = function (){
    this.player().send_game_board_p(false);
};

exports.Ship= Ship;
