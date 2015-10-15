// window.onload = function() {
//   console.log('app.js is loaded.');
//
//
// };

function Tile(position, value) {
  this.x = position.x;
  this.y = position.y;
  // If value is not specified, the default value should be 2
  this.value = value || 2;
}

Tile.prototype.update = function(position, value) {
  this.x = position.x;
  this.y = position.y;
  this.value = value || this.value;
};

Tile.prototype.serialize = function() {
  return {
    position : {
      x: this.x,
      y: this.y
    },
    value: this.value
  };
};

Tile.prototype.toJqueryObject = function() {
  var jqueryObject = $('<div></div>');
  jqueryObject.addClass('grid-cell');
  jqueryObject.text(this.value);
  var topPx = 120 * this.x;
  var leftPx = 120 * this.y;
  jqueryObject.css({
    position: 'absolute',
    top: (topPx + 'px'),
    left: (leftPx + 'px')
  });

  return jqueryObject;
};


// var tile00 = new Tile({ x: 0, y: 0}, 2);
// var tile13 = new Tile({ x: 1, y: 3}, 4);
// console.log(tile00);
// console.log(tile13.serialize());
// var boardDiv = $('.grid-container');
// var tile00Div = tile00.toJqueryObject();
// var tile13Div = tile13.toJqueryObject();
// boardDiv.append(tile00Div);
// boardDiv.append(tile13Div);




// $(document).ready(function() {
//   console.log('document.ready is working');
//   $('.grid-container').on('click', '#cell-0-0', function(){
//     console.log($(this));
//     $(this).animate({
//       left: '+=120px'
//       }, 2000, function() {
//         $(this).next().append('<br>Hi! I\'m combined!');
//         $(this).next().effect('shake');
//         console.log('Inside animate this = ');
//         console.log($(this));
//         $(this).remove();
//     });
//   });
//
//   $('.grid-container').on('click', '#cell-0-1', function() {
//     $(this).animate({
//       left: '+=240px'
//     }, 2000, function() {
//       $(this).append('<br>Hi! I\'m just moved');
//     });
//   });
// });
