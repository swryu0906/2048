function Board(size) {
  this.size = size;
  this.board = [];
  // this.unusedIndexes = [];
  this.unusedTiles = [];

  var self = this;

  // this.parseIndexToPosition = function(index) {
  //   return {
  //     x: Math.floor(index / self.size),
  //     y: index % self.size
  //   };
  // };
  //
  // this.parsePositionToIndex = function(position) {
  //   return position.x * self.size + position.y;
  // };
  //
  // this.getUnusedIndexes = function() {
  //   var unusedIndexes = [];
  //   for(var i = 0; i < self.board.length; i++) {
  //     if(self.board[i] === null) unusedIndexes.push(i);
  //   }
  //   return unusedIndexes;
  // };

  // board array should contain (size * size) number of
  // null elements in the initialization.
  // unusedTiles array should contain (size * size) number of
  // Tile instances in the initialization.
  for(var i = 0; i < (this.size * this.size); i++) {
    this.board.push(null);
    this.unusedTiles.push(new Tile());
  }

//   var insertTile = function() {
//     var unusedIndexes = getUnusedIndexes();
//     console.log(unusedIndexes);
//     var randomIndex = Math.floor(Math.random() * unusedIndexes.length);
//     console.log(randomIndex);
//     var newTile = self.unusedTiles.pop();
//     console.log(newTile);
//     newTile.reset();
//     console.log(newTile);
//     newTile.update(parseIndexToPosition(unusedIndexes[randomIndex]));
//     console.log(newTile);
//     console.log(self.board);
//     self.board[unusedIndexes[randomIndex]] = newTile;
//     console.log(self.board);
//     console.log(getUnusedIndexes());
//
//     $('.grid-container').append(newTile.toJqueryObject());
//     // var newTile = self.unusedTiles.splice(randomIndex, 1);
//
//   }
}

Board.prototype.parseIndexToPosition = function(index) {
  return {
    x: Math.floor(index / this.size),
    y: index % this.size
  };
};

Board.prototype.parsePositionToIndex = function(position) {
  return position.x * this.size + position.y;
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

Board.prototype.moveTile = function() {

};


var newBoard = new Board(4);
// console.log(newBoard.board);
// console.log(newBoard.unusedTiles);
$('#test-btn').on('click', function() {
  newBoard.insertTile();
});
