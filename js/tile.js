// window.onload = function() {
//   console.log('app.js is loaded.');
// };

function Tile(id) {
  this.id = id;
  this.x = null;
  this.y = null;
  // the default value should be 2 or 4
  this.value = Math.floor(Math.random() * 2) * 2 + 2;
}

Tile.prototype.reset = function() {
  this.x = null;
  this.y = null;
  this.value = Math.floor(Math.random() * 2) * 2 + 2;
};

Tile.prototype.update = function(pos, value) {
  this.x = pos.x;
  this.y = pos.y;
  // If the value argumenet is not provided,
  // the previous value should be kept.
  this.value = value || this.value;
};

Tile.prototype.serialize = function() {
  return {
    pos : {
      x: this.x,
      y: this.y
    },
    value: this.value
  };
};

Tile.prototype.toJqueryObject = function() {
  var jqueryObject = $('<div></div>');
  jqueryObject.addClass('tile');
  jqueryObject.attr('id', this.id.toString());
  jqueryObject.text(this.value);
  var topPx = 120 * this.x;
  var leftPx = 120 * this.y;
  jqueryObject.css({
    pos: 'absolute',
    top: (topPx + 'px'),
    left: (leftPx + 'px')
  });
  return jqueryObject;
};


// var tile00 = new Tile({ x: 0, y: 0});
// var tile13 = new Tile({ x: 1, y: 3});
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
