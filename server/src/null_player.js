function NullPlayer() {
}

NullPlayer.prototype.bump_score = function () {
};

NullPlayer.prototype.score = function () {
};

NullPlayer.prototype.color= function() {
  return 'white';
};

NullPlayer.prototype.add_ship= function() {
};

NullPlayer.prototype.connect_ship= function() {
};

NullPlayer.prototype.arrange_for_resurrection= function() {
};

exports.NullPlayer = NullPlayer;
