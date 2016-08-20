var vector= require('./vector');
var transforms= require('./transform');
var screen_object = require('./screen_object');
var util = require('util');
var math_util = require('./math_util');
var fragment_maker = require('./fragment_maker');
var Fragment= require('./fragment').Fragment;


function Ship(initial_state) {
  screen_object.ScreenObject.call(this, initial_state);

  this.rotation= initial_state.rotation || 0;
  this.acceleration= initial_state.acceleration || 0;
  this.raw_gun_point = new vector.Vector(initial_state.gun_point || [0,0]);

}

util.inherits(Ship, screen_object.ScreenObject);


Ship.prototype.on_message = function(json_message) {
  var message = JSON.parse(json_message);

  switch (message.command) {
  case 'rotate_left':
    this.angular_velocity= -this.game.ship_rotation_rate;
    break;
  case 'rotate_right':
    this.angular_velocity= this.game.ship_rotation_rate;
    break;
  case 'rotate_stop':
      this.angular_velocity= 0;
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
  }
};


Ship.prototype.update= function(tick_rate) {
  Ship.super_.prototype.update.call(this, tick_rate);
  this.velocity.add_to(new vector.Vector({magnitude: this.acceleration / tick_rate,
    heading: this.heading}));
};



Ship.prototype.gun_point= function() {
  var transformed_point= [0,0,1];
  transforms.apply_transform(transformed_point, this.ship_to_game_transform(), this.raw_gun_point.coordinates);
  return new vector.Vector(transformed_point);
};

Ship.prototype.explode = function() {
    this.game.game_field.remove_screen_object(this);
    return fragment_maker.add_fragments(this.game, this.game.game_field, this.position(), this.velocity);
};

Ship.prototype.fire= function(){
  var bullet_speed= this.game.bullet_speed;
  var bullet_parameters= {
    game: this.game,
    life_left: this.game.bullet_life_time,
    position: this.gun_point().coordinates,
    velocity: [this.velocity.x() + bullet_speed * Math.cos(this.heading),
               this.velocity.y() + bullet_speed * Math.sin(this.heading)],
    ship: this,
    player: this.player()
  };
  return this.game.game_field.add_bullet(bullet_parameters);
};

Ship.prototype.clone= function() {
  this.game.add_ship();
};

Ship.prototype.is_ship = function() {
  return true;
};

Ship.prototype.score= function() {
  if (!this.player())
    return null;
  return this.player()._score;
};


exports.Ship= Ship;
