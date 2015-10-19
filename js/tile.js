// window.onload = function() {
//   console.log('app.js is loaded.');
// };

function Tile(id) {
  this.id = id;
  // the default value should be 2 or 4
  this.value = Math.floor(Math.random() * 2) * 2 + 2;
  this.x = null;
  this.y = null;
}

Tile.prototype.reset = function() {
  this.value = Math.floor(Math.random() * 2) * 2 + 2;
  this.x = null;
  this.y = null;
};

Tile.prototype.update = function(pos, value) {
  // If the value argumenet is not provided,
  // the previous value should be kept.
  this.value = value || this.value;
  this.x = pos.x;
  this.y = pos.y;
};

Tile.prototype.serialize = function() {
  return {
    id: this.id,
    value: this.value,
    pos : {
      x: this.x,
      y: this.y
    }
  };
};

Tile.prototype.toJqueryObject = function() {
  var jqueryObject = $('<div></div>');
  jqueryObject.attr('id', this.id.toString());
  jqueryObject.addClass('tile');
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


// var tile0 = new Tile(0);
// var tile1 = new Tile(1);
// console.log(tile0);
// console.log(tile1);
// console.log(tile0.serialize());
// console.log(tile1.serialize());
// var boardDiv = $('.grid-container');
// tile0.update({ x: 3, y: 0 });
// tile1.update({ x: 1, y: 3 }, 16);
// console.log(tile0);
// console.log(tile1);
// var tile0Div = tile0.toJqueryObject();
// var tile1Div = tile1.toJqueryObject();
// boardDiv.append(tile0Div);
// boardDiv.append(tile1Div);




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
