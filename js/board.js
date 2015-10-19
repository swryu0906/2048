function Board(size) {
  this.size = size;
  this.grid = [];
  this.unusedTiles = [];
  // animation unit time
  this.aniUnitTime = 500;

  // this.grid array should contain (size * size) number of
  // null elements after initialization.
  // unusedTiles array should contain (size * size) number of
  // Tile instances after initialization.
  for(var i = 0; i < (this.size * this.size); i++) {
    this.grid.push(null);
    this.unusedTiles.push(new Tile(i));
  }
}

Board.prototype.parseIndexToPos = function(index) {
  return {
    x: Math.floor(index / this.size),
    y: index % this.size
  };
};

Board.prototype.parsePosToIndex = function(pos) {
  return pos.x * this.size + pos.y;
};

// getUnusedIndexes() function should return an array which
// contains the indexes of empty cells
Board.prototype.getUnusedIndexes = function() {
  var unusedIndexes = [];
  for(var i = 0; i < this.grid.length; i++) {
    if(this.grid[i] === null) unusedIndexes.push(i);
  }
  return unusedIndexes;
};

// isFull() function should check
// whether the board is full of tiles or not
Board.prototype.isFull = function() {
  return (this.getUnusedIndexes().length === 0);
};

// insertTile() function should insert an reset tile
// to one of the empty cells
Board.prototype.insertTile = function() {
  var unusedIndexes = this.getUnusedIndexes();
  var unusedIndex = unusedIndexes[Math.floor(Math.random() * unusedIndexes.length)];
  var newTile = this.unusedTiles.shift();
  newTile.reset();
  newTile.update(this.parseIndexToPos(unusedIndex));
  this.grid[unusedIndex] = newTile;

  // Append newTile.jqOjbect to .grid-container
  $('.grid-container').append(newTile.toJqueryObject());
};

// When a tile is moving without conbining with another tile
Board.prototype.moveTile = function(oldIndex, newIndex) {
  var oldPos = this.parseIndexToPos(oldIndex);
  var newPos = this.parseIndexToPos(newIndex);
  var movingTile = this.grid[oldIndex];
  // console.log(movingTile);
  this.grid[oldIndex] = null;

  movingTile.update(newPos);
  this.grid[newIndex] = movingTile;
  // console.log(newPos);
  // console.log(movingTile);
  // this.grid[newIndex] = movingTile;
  // console.log(this.grid[newIndex]);
  var xDistance = newPos.x - oldPos.x;
  var yDistance = newPos.y - oldPos.y;

  // When a tile is moving vertically
  if(xDistance !== 0){
    $('#' + movingTile.id).animate({
      top: ('+=' + (120 * xDistance) + 'px')
    }, (this.aniUnitTime * Math.abs(xDistance)), function() {
      // $(this).append('I\'m moved x = ' + xDistance + ', y= ' + yDistance);
    });
  }
  // When a tile is moving horizontally
  else {
    $('#' + movingTile.id).animate({
      left: ('+=' + (120 * yDistance) + 'px')
    }, (this.aniUnitTime * Math.abs(yDistance)), function() {
      // $(this).append('I\'m moved x = ' + xDistance + ', y= ' + yDistance);
    });
  }
};

// When two tiles are moving and being combined.
Board.prototype.combineTiles = function(aIndex, bIndex, newIndex) {
  var aPos = this.parseIndexToPos(aIndex);
  var bPos = this.parseIndexToPos(bIndex);
  var newPos = this.parseIndexToPos(newIndex);

  var aTile = this.grid[aIndex];
  var bTile = this.grid[bIndex];

  // Moves one of the two tiles to the new position
  // and doubles its value.
  // Set the new grid index and reset the two old grid cells


  this.grid[aIndex] = null;
  // console.log('grid[newIndex] = ');
  // console.log(this.grid[newIndex]);
  this.grid[bIndex] = null;
  // console.log('grid[newIndex] = ');
  // console.log(this.grid[newIndex]);
  aTile.update(newPos, (aTile.value * 2));
  this.grid[newIndex] = aTile;
  // console.log('grid[newIndex] = ');
  // console.log(this.grid[newIndex]);

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

// var b = new Board(4);
// $('#insert-btn').on('click', function() {
//   b.insertTile();
// });
