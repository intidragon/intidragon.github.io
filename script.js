$(document).ready(function() {
  //loading(tileSize, gridSize, duration);
  //Place this function in document ready
  loading(50, 3, 4); 
});

//Creates the matrix of divs for the loading animation. Sets tile css properties.
function createMatrix(x_tiles, y_tiles, t_width, t_height, bkg_width, bkg_height, duration){
  var index = 0;
  
  var formattedIndex = 0;

  //Creates matrix of divs
  for(var x = 0; x < x_tiles; x++){
    for(var y = 0; y < y_tiles; y++){
      formattedIndex = getTileIndex(index);

      var $tile = "<div class = 'tile tile-" + formattedIndex + "'></div>";

      //Delays animation start per tile by increments of 1/10 sec.
      var delay = 0.1 * parseInt(formattedIndex) + 's';

      $('.loading-logo').append($tile);

      index++;
    }
  }

  $('.loading-logo').css('width', x_tiles * t_width + 'px');
  $('.loading-logo').css('height',  y_tiles * t_height + 'px');

	$('.loading-logo .tile').css('-webkit-animation', 'tile-flip' + ' ' + duration + 's infinite');
	$('.loading-logo .tile').css('-moz-animation', 'tile-flip' + ' ' + duration + 's infinite');
	$('.loading-logo .tile').css('animation', 'tile-flip' + ' ' + duration + 's infinite');

  $('.loading-logo .tile').css('background-size', bkg_width + 'px ' + bkg_height + 'px');
  $('.loading-logo .tile').css('width', t_width + 'px');
  $('.loading-logo .tile').css('height', t_height + 'px');

	index = 0;

	for(var x = 0; x < x_tiles; x++){
    for(var y = 0; y < y_tiles; y++){
      formattedIndex = getTileIndex(index);

      var delay = 0.1 * parseInt(formattedIndex) + 's';

      $('.tile-' + formattedIndex).css('animation-delay', delay);

      index++;
    }
  }
 }

//Formats index by appending a 0 onto indices below 10. For consistency in manipulation of css.
function getTileIndex(index){
  if(index < 10) return '0' + index;
  else return index;
}

//Offsets the background per tile such that the conglomerate displays the entire image
function gridify(x_tiles, t_width, t_height){
  var posX = 0;
  var posY = 0;
  var i = 0;

  $(".loading-logo .tile").each(function (ind, el) {
    $(this).css("background-position", posX.toString() + "px " + posY.toString() + "px");

    posX -= t_width;
    i++;

    if (i == x_tiles) {
      i = 0;
      posX = 0;
      posY -= t_height;
    }
  });
}

//Pass in tile size, number of x & y tiles, and the duration of the total animation
function loading(tileSize, gridSize, duration){
	//Grid size
  var NUM_TILES = gridSize;

  //Set num of x and y tiles to same amount
	var MATRIX_X_TILES = NUM_TILES;
	var MATRIX_Y_TILES = NUM_TILES;

  //Tile size
	var TILE_WIDTH = tileSize;
	var TILE_HEIGHT = tileSize;

  //Background image size. Set equal to the size of the whole matrix
	var BACKGROUND_WIDTH = MATRIX_X_TILES * TILE_WIDTH;
	var BACKGROUND_HEIGHT = MATRIX_Y_TILES * TILE_HEIGHT;

  //Create the matrix
  createMatrix(MATRIX_X_TILES, MATRIX_Y_TILES, TILE_WIDTH, TILE_HEIGHT, BACKGROUND_WIDTH, BACKGROUND_HEIGHT, duration);

  //Offsets tile backgrounds properly
  gridify(MATRIX_X_TILES, TILE_WIDTH, TILE_HEIGHT);
}