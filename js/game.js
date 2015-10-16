var Game = (function(){
  var size;
  var board;

  var addEvents = function() {
    $(document).keydown(function(event) {
      // prevent the default actions like scroll and move caret

      event.preventDefault();
      console.log(event);

      switch(event.which) {
        // left
        case 37:
          console.log('left arrow is pressed.');
          break;

        // up
        case 38:
          console.log('up arrow is pressed.');
          break;

        // right
        case 39:
          console.log('right arrow is pressed.');
          break;

        // down
        case 40:
          console.log('down arrow is pressed.');
          break;

        // exit this event handler for other keypress
        default:
          return;
      }
    });
  };

  return {


    start: function(newSize) {
      size = newSize || 4;
      board = new Board(size);
      console.log(addEvents);
      addEvents();
    },
  };
})();


Game.start();
