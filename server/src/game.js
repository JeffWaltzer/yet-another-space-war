var underscore= require('underscore');
var ship=require('./ship');
var bullet=require('./bullet');
var vector=require('./vector');

exports.Game=function(initial_state) {
  var self = this;
  self.field_size = initial_state.field_size || new vector.Vector([800,600]);
  self.bullet_speed= initial_state.bullet_speed || 7;

  self.bullet_life_time = initial_state.bullet_life_time || 3;

  self.add_screen_object= function(new_screen_object) {
    self.screen_objects.push(new_screen_object);
    return new_screen_object;
  };

  self.add_ship = function(parameters) {
    var defaultState = {
      game: self,
      rotation: 0,
      points: [[-10, 10], [20, 0], [-10, -10], [0, 0]],
      gun_point: [21,0],
      heading: 0,
      position: [0, 0]
    };

    if (parameters !== undefined)
      underscore.extend(defaultState ,parameters);

    return self.add_screen_object(new ship.Ship(defaultState));
  };

  self.add_bullet= function(parameters){
    var defaultState = {
      game: self,
      rotation: 0,
      points: [[-1, -1], [-1, 1], [1, 1], [1, -1]],
      position: [0, 0]
    };

    if (parameters !== undefined)
      underscore.extend(defaultState ,parameters);

    return self.add_screen_object(new bullet.Bullet(defaultState));
  };

  function each_screen_object(callback_function) {
    underscore.each(self.screen_objects, callback_function);
  }

  function remove_dead_objects() {
    self.screen_objects= underscore.filter(self.screen_objects,function(screen_object){
      return !screen_object.dead();
    });
  }

  function handle_collisions() {
    var to_remove=[];
    for(var i = 0; i< self.screen_objects.length; i++) {
      var screenObject1 = self.screen_objects[i];
      for(var j = i+1; j< self.screen_objects.length; j++) {
        var screenObject2 = self.screen_objects[j];

        var collided = exports.collided(screenObject1, screenObject2);
        if(collided) {
          to_remove.push(screenObject1);
          to_remove.push(screenObject2);
        }
      }
    }
    self.screen_objects = underscore.difference(self.screen_objects,to_remove);
  }

  function update_screen_objects() {
    each_screen_object(
      function(screen_object) {
        screen_object.update(
          initial_state.tick_rate,
          initial_state.ship_rotation_rate,
          initial_state.acceleration_rate);
      });

    handle_collisions();

    remove_dead_objects();
  }

  function game_board() {
    var outlines = {};
    each_screen_object(
      function(screen_object, id) {
        outlines[id] = screen_object.outline();
      });
    return JSON.stringify(outlines);
  }

  function send_game_board(new_board) {
    each_screen_object(
      function(ship) { if (ship.socket) ship.socket.send(new_board); });
  }

  self.tick= function() {
    update_screen_objects();
    send_game_board(game_board());
  };

  if (initial_state.tick_rate!==0)
    setInterval(self.tick, 1000/initial_state.tick_rate);

  self.screen_objects=[];
};

function point_inside(object1,object2) {
  var big_line= [object1.lines()[0][0], [-10000, -10000]];
  var intersection_count= 0;

  underscore.each(object2.lines(), function(object_line) {

    if (intersect(big_line, object_line))
      intersection_count++;
  });

  return (intersection_count % 2) == 1;
}

exports.collided =  function(object1, object2) {
  if (!exports.bounding_boxes_intersect(object1.bounding_box,
                                        object2.bounding_box))
    return false;

  var result= false;
  underscore.each(object1.lines(),function(line1){
    underscore.each(object2.lines(),function(line2){
      if (intersect(line1,line2))
        result= true;
    });
    result = result || point_inside(object1,object2) || point_inside(object2,object1);
  });
  return result;
};

exports.bounding_boxes_intersect = function(box1, box2) {
  function check_one_way(box1, box2) {
    var top_edge_in = (box1.top <= box2.top && box1.top >= box2.bottom);
    var bottom_edge_in = (box1.bottom <= box2.top && box1.bottom >= box2.bottom);
    var left_edge_in = (box1.left >= box2.left && box1.left <= box2.right);
    var right_edge_in = (box1.right >= box2.left && box1.right <= box2.right);

    if (top_edge_in && left_edge_in)
      return true;

    if (top_edge_in && right_edge_in)
      return true;

    if (bottom_edge_in && left_edge_in)
      return true;

    if (bottom_edge_in && right_edge_in)
      return true;

    return false;
  }

  return check_one_way(box1, box2) || check_one_way(box2, box1);
};

function vector_subtract(a, b) {
  return [a[0]-b[0], a[1]-b[1]];
}

function vector_cross(a, b) {
  return a[0]*b[1] - a[1]*b[0];
}

function intersect(line1, line2) {
  var p= line1[0];
  var q= line2[0];
  var r= vector_subtract(line1[1], line1[0]);
  var s= vector_subtract(line2[1], line2[0]);

  var line1_t= vector_cross(vector_subtract(q,p), s) /
    vector_cross(r, s);
  var line2_t= vector_cross(vector_subtract(p,q), r) /
    vector_cross(s, r);

  return line1_t >= 0 && line1_t <= 1 &&
         line2_t >= 0 && line2_t <= 1;
}
