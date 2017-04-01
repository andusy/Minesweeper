//16x30
const FILLED = true;
const EMPTY = false;

const FLIPPED = true;
const NOTFLIPPED = false;

var board, canvas;
var num_mines = 99; //Mines to be placed
var num_mines_remaining = 99; //Number of mines currently on the field
var x = 30;
var y = 16;

//Variable for field that holds true or false values representing if there is a mine on that tile
var play_field = new Array(x); //The board that contains the tiles

for (i = 0; i < x; i++){ //Creating 2d array
	play_field[i] = new Array(y);
}

//Variable for field that states whether the tile has been flipped or not
var flip = new Array(x); //The board that contains the tiles

for (i = 0; i < x; i++){ //Creating 2d array
	flip = new Array(y);
}

//Variable to representing the tiles with numbers on them
var tile = new Array(x); //The board that contains the tiles

for (i = 0; i < x; i++){ //Creating 2d array
	tile = new Array(y);
}

function startGame(){
	canvas = document.getElementById("board");
	board = canvas.getContext("2d");

	initBoard(play_field, flip, tile); //Initialization of the board

	//setInterval(function(){ updateBoard(board) }, 1000/30); //Updates the heading (Time/Number of mines)
	setInterval(function(){ updateBoard(board) }, 1000/30); //Updates the board tiles
}

function updateBoard(b){
	//Draws canvas
	b.beginPath();
	b.arc(100,50,40,0,2*Math.PI);
	b.stroke();
}

//Initializes the board to have 99 mines (true), every element is unflipped and assigns a number to each tile
function initBoard(field, status, num){
	var xcount = 0;
	var ycount = 0;
	//Initializing every element to EMPTY
	for (i = 0; i < x; i++){
		for (j = 0; j < y; j++){
			field[i][j] = EMPTY;
			field[i][j] = NOTFLIPPED;
		}
	}

	//Randomly places a mine
	while (num_mines > 0){

		if (xcount == x){
			xcount = 0;
			ycount ++;
		}

		if (ycount == y){
			ycount = 0;
		}

		if ( Math.random() >= 0.5 && field[xcount][ycount] == EMPTY){ //Checks the condition that the tile is to be filled and it is currently empty
			field[xcount][ycount] = true;
			num_mines--;
		}

		//increments the x
		xcount++;
	}

	//Assigns numbers to the tiles
	var num_mines_touching;

	/*
	0,0	...	0,y-1
	.
	.
	x-1,0	...	x-1,y-1
	*/

	/*
	for (i = 0; i < x; i++){
		num_mines_touching = 0;
		for (j = 0; j < y; j++){
			//Checking special cases
			if (i == 0 && j == 0){ //Top left

			} else if (i == 0 && j == y-1){ //Top right

			} else if (i == 0){ //Top row

			} else if (i == x-1 && j == 0){//Bottom Left

			} else if (i == x-1 && j == y-1){//Bottom right

			} else if (i == x-1 ){//Bottom row

			} else if (y == 0){//Left Column

			} else if (y == y-1){//Right Column

			} else	{ //No special case

			}

		}
	}*/

}


