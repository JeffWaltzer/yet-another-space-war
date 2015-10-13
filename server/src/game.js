var underscore= require('underscore');
var ship=require('./ship');
var bullet=require('./bullet');
var vector=require('./vector');
var Player= require('./player').Player;

exports.Game=function(initial_state) {
  var self = this;
  if (!initial_state)
    initial_state= {};

  self.field_size = initial_state.field_size || new vector.Vector([800,600]);
  self.bullet_speed= initial_state.bullet_speed || 7;

  self.bullet_life_time = initial_state.bullet_life_time || 3;

  self.players= {};
  self.screen_objects=[];
  self.next_id = 0;

  self.add_player= function(player_id) {
    var new_player= new Player();
    this.players[player_id]= new_player;
    return new_player;
  };

  self.connect_socket= function(player_id, socket) {
    this.players[player_id].socket = socket;
  };

  self.connect_ship= function(player_id, ship) {
    var the_player= this.players[player_id];
    the_player.ship= ship;
    ship.player= the_player;
  };

  self.add_screen_object= function(new_screen_object) {
    new_screen_object.id=  (self.next_id++).toString();
    self.screen_objects.push(new_screen_object);
    return new_screen_object;
  };

  self.random_position = function() {
    return [
      self.field_size.x() * Math.random(),
      self.field_size.y() * Math.random()
    ];
  };

  self.add_ship = function(parameters) {
    var defaultState = {
      game: self,
      rotation: 0,
      points: [[-10, 10], [20, 0], [-10, -10], [0, 0]],
      gun_point: [21,0],
      heading: 0,
      position: self.random_position()
    };

    if (parameters !== undefined)
      underscore.extend(defaultState ,parameters);

    var new_ship = self.add_screen_object(new ship.Ship(defaultState));

    if (!parameters || !parameters.position)
      self.place_ship(new_ship);

    return new_ship;
  };

  self.place_ship= function(ship) {    
    var number_collided = self.collisions_with(ship, 0).length;
    while (number_collided > 0) {
      ship.position( new vector.Vector(self.random_position()));
      number_collided = self.collisions_with(ship, 0).length;
    }
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
    return underscore.map(self.screen_objects, callback_function);
  }

  function each_player(callback_function) {
    underscore.each(self.players, callback_function);
  }

  function remove_dead_objects() {
    self.screen_objects= underscore.filter(self.screen_objects,function(screen_object){
      return !screen_object.dead();
    });
  }

  self.collisions_with= function(screenObject,start_index) {
    var to_remove = [];

    for(var j = start_index; j< self.screen_objects.length; j++) {
      var screenObject2 = self.screen_objects[j];

      if (screenObject2 === screenObject)
        continue;

      var collided = exports.collided(screenObject, screenObject2);
      if(collided) {
        to_remove.push(screenObject2);
      }
    }
    return to_remove;
  };

  self.handle_collisions= function() {
    var maybe_bump_score= function(screen_object, o) {
      if (screen_object.ship && !o.ship  ||  !screen_object.ship && o.ship)
        o.ship.player.bump_score();
    };

    var to_remove=[];
    for(var i = 0; i< self.screen_objects.length; i++) {
      var screen_object = self.screen_objects[i];
      var objects_collided_with = self.collisions_with(screen_object, i+1);

      if (objects_collided_with.length>0) {
        underscore.each(objects_collided_with, underscore.bind(maybe_bump_score, this, screen_object));
        to_remove.push(screen_object);
      }
      to_remove = to_remove.concat(objects_collided_with);
    }

    self.screen_objects = underscore.difference(self.screen_objects, to_remove);
  };

  function update_screen_objects() {
    each_screen_object(
      function(screen_object) {
        screen_object.update(
          initial_state.tick_rate,
          initial_state.ship_rotation_rate,
          initial_state.acceleration_rate);
      });

    self.handle_collisions();

    remove_dead_objects();
  }

  function make_game_piece(screen_object, id) {
    var return_value= {outline: screen_object.outline(),
                            id: screen_object.id,
                      position: [screen_object.position().x(),
                                 screen_object.position().y()]};
    if (underscore.has(screen_object, 'score'))
      return_value.score= screen_object.score();
    return return_value;
  } 

  self.game_board= function() {
    var outline_array= each_screen_object(make_game_piece);
    var outlines= [];
    underscore.each(outline_array, function(outline, index) {
      outlines.push(outline);
    });
    return outlines;
  };

  function send_game_board_to_player(board, player) {
    if (!player.socket)
      return;

    var message= { screen_objects: board };

    if (player.ship)
      message.you= player.ship.id;

    player.socket.send(JSON.stringify(message));
  }    

  self.send_game_board= function(new_board) {
    each_player(underscore.bind(send_game_board_to_player, this, new_board));
  };

  self.tick= function() {
    update_screen_objects();
    self.send_game_board(self.game_board());
  };

  self.start_ticking= function(tick_rate) {
    if (tick_rate!==0)
      setInterval(self.tick, 1000/tick_rate);
  };

};

function point_inside(object1,object2) {
  var big_line= [object1.lines()[0][0], [-10000, -10000]];
  var intersection_count= 0;

  underscore.each(object2.lines(), function(object_line) {

    if (exports.intersect(big_line, object_line))
      intersection_count++;
  });

  return (intersection_count % 2) == 1;
}

exports.collided =  function(object1, object2) {
  if (!exports.bounding_boxes_intersect(object1.bounding_box,
                                        object2.bounding_box)) {
    return false;
  }

  var result= false;
  underscore.each(object1.lines(),function(line1){
    underscore.each(object2.lines(),function(line2){
      if (exports.intersect(line1,line2))
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

exports.intersect= function(line1, line2) {
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
};
