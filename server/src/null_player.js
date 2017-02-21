function NullPlayer() {
}

NullPlayer.prototype.bump_score = function () {
};

NullPlayer.prototype.score = function () {
};

NullPlayer.prototype.color= function() {
  return 'white';
};

exports.NullPlayer = NullPlayer;
