function Board(size) {
  this.size = size;
  this.board = [];
  this.unusedTiles = [];
  this.aniUnitTime = 200;

  // board array should contain (size * size) number of
  // null elements in the initialization.
  // unusedTiles array should contain (size * size) number of
  // Tile instances in the initialization.
  for(var i = 0; i < (this.size * this.size); i++) {
    this.board.push(null);
    this.unusedTiles.push(new Tile(i));
  }
}

Board.prototype.parseIndexToPosition = function(index) {
  return {
    x: Math.floor(index / this.size),
    y: index % this.size
  };
};

Board.prototype.parsePositionToIndex = function(pos) {
  return pos.x * this.size + pos.y;
};

Board.prototype.getUnusedIndexes = function() {
  var unusedIndexes = [];
  for(var i = 0; i < this.board.length; i++) {
    if(this.board[i] === null) unusedIndexes.push(i);
  }
  return unusedIndexes;
};

Board.prototype.isFull = function() {
  return (this.getUnusedIndexes().length === 0);
};

Board.prototype.insertTile = function() {
  var unusedIndexes = this.getUnusedIndexes();
  var unusedIndex = unusedIndexes[Math.floor(Math.random() * unusedIndexes.length)];
  var newTile = this.unusedTiles.pop();
  newTile.reset();
  newTile.update(this.parseIndexToPosition(unusedIndex));
  this.board[unusedIndex] = newTile;

  $('.grid-container').append(newTile.toJqueryObject());
  // var newTile = self.unusedTiles.splice(randomIndex, 1);
};

// When a tile is moving without conbining with another
Board.prototype.moveTile = function(oldPos, newPos) {
  var movingTile = this.board[this.parsePositionToIndex(oldPos)];
  // console.log(movingTile);
  this.board[this.parsePositionToIndex(newPos)] = movingTile.update(newPos);
  // console.log(movingTile);
  this.board[this.parseIndexToPosition(oldPos)] = null;
  var xDistance = newPos.x - oldPos.x;
  var yDistance = newPos.y - oldPos.y;

  // When a tile is moving vertically
  if(xDistance !== 0){
    $('#' + movingTile.id).animate({
      top: ('+=' + (120 * xDistance) + 'px')
    }, (this.aniUnitTime * Math.abs(xDistance)), function() {
      $(this).append('I\'m moved x = ' + xDistance + ', y= ' + yDistance);
    });
  }
  // When a tile is moving horizontally
  else {
    $('#' + movingTile.id).animate({
      left: ('+=' + (120 * yDistance) + 'px')
    }, (this.aniUnitTime * Math.abs(yDistance)), function() {
      $(this).append('I\'m moved x = ' + xDistance + ', y= ' + yDistance);
    });
  }
};

// When two tiles are moving and being combined.
Board.prototype.combineTiles = function(aPos, bPos, newPos) {
  var aTile = this.board[this.parsePositionToIndex(aPos)];
  var bTile = this.board[this.parsePositionToIndex(bPos)];

  // Moves One of the two tiles to the new position
  // and doubles its value.
  aTile.update(newPos, (aTile.value * 2));
  this.board[this.parsePositionToIndex(newPos)] = aTile;

  // Reset the other tile and push it to the unusedTiles array
  bTile.reset();
  this.unusedTiles.push(bTile);

  var aXDistance = newPos.x - aPos.x;
  var aYDistance = newPos.y - aPos.y;
  var bXDistance = newPos.x - bPos.x;
  var bYDistance = newPos.y - bPos.y;

  // Shake the tile right after the tile which travels longer,
  // arrives at the newPos
  var shakeTile = function() {
    $('#' + bTile.id).remove();
    $('#' + aTile.id).text(aTile.value).effect('shake');
  }

  // When two tiles are moving vertially
  if(aXDistance !== 0 || bXDistance !== 0) {
    // Moves the tile from aPos
    $('#' + aTile.id).animate({
      top: ('+=' + (120 * aXDistance) + 'px')
      }, (this.aniUnitTime * Math.abs(aXDistance)), function() {
      // When the tile from aPos moves longer than the other,
      // shake the tile right after the tile which travels longer
      // arrives at the newPos
      if(Math.abs(aXDistance) > Math.abs(bXDistance)) shakeTile();
    });
    // Moves the tile from bPos
    $('#' + bTile.id).animate({
      top: ('+=' + (120 * bXDistance) + 'px')
    }, (this.aniUnitTime * Math.abs(bXDistance)), function() {
      if(Math.abs(aXDistance) < Math.abs(bXDistance)) shakeTile();
    });
  }
  // When two tiles are moving horizontally
  else {
    // Moves the tile form aPos
    $('#' + aTile.id).animate({
      left: ('+=' + (120 * aYDistance) + 'px')
    }, (this.aniUnitTime * Math.abs(aYDistance)), function() {
      // When the tile from aPos moves longer than the other,
      // shake the tile right after the tile which travels longer
      // arrives at the newPos
      if(Math.abs(aYDistance) > Math.abs(bYDistance)) shakeTile();
    });
    // Moves the tile from bPos
    $('#' + bTile.id).animate({
      left: ('+=' + (120 * bYDistance) + 'px')
    }, (this.aniUnitTime * Math.abs(bYDistance)), function() {

      if(Math.abs(aYDistance) < Math.abs(bYDistance)) shakeTile();
    });
  }
};

var newBoard = new Board(4);
$('#insert-btn').on('click', function() {
  newBoard.insertTile();
});
