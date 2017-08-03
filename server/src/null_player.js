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

exports.NullPlayer = NullPlayer;
