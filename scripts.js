//16x30
const FILLED = true;
const EMPTY = false;

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

//Variable to representing the tiles with numbers on them
var tile = new Array(x); //The board that contains the tiles

for (i = 0; i < x; i++){ //Creating 2d array
	tile[i] = new Array(y);
}

function startGame(){
	canvas = document.getElementById("board");
	board = canvas.getContext("2d");

	//while (true){ //Continuously run the game
		initBoard(play_field, tile,board); //Initialization of the board
		
		//Waits for the mouse click
		canvas.addEventListener("mousedown", getPosition, false);
	//}
}

//Initializes the board to have 99 mines (true), every element is unflipped and assigns a number to each tile
function initBoard(field, num,b){
	var xcount = 0;
	var ycount = 0;

	//Draws top bar
	b.fillStyle="#3D7E85";
	b.fillRect(0,0,600,80);

	//Draws the tiles
	for (i = 0; i < x; i ++){
		for (j = 0; j < y; j++){
			//Draw the outline of the tiles
			b.rect(20*i,380-20*j,20,20);
			b.stroke();
			b.fillStyle="#294F83";
			b.fillRect(20*i,380-20*j,20,20);
		}
	}
	//Draw another box for final tile
	b.rect(580,80,20,20);
	b.stroke();

	//Box for number of mines
	b.rect(20,20,40,40);
	b.stroke();
	b.fillStyle="#000";
	b.fillRect(20,20,40,40);

	//Write the number of mines remaining
	b.font = "bold 20px Trebuchet";
	b.fillStyle="#FF0000";
	var str = "" + num_mines_remaining;
	b.fillText(str,30,45);

	//Initializing every element to EMPTY
	for (i = 0; i < x; i++){
		for (j = 0; j < y; j++){
			field[i][j] = EMPTY;
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

		if ( Math.random() * 10 >= 9 && field[xcount][ycount] == EMPTY){ //Checks the condition that the tile is to be filled and it is currently empty
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
	
	//Assigns numbers to the tiles representing the number of mines that each tile is touching
	for (i = 0; i < x; i++){
		for (j = 0; j < y; j++){
			num_mines_touching = 0; //Reset count to 0
				
			if (field[i][j] == EMPTY){
				//Checking special cases
				if (i == 0 && j == 0){ //Top left
					for (k = 0; k <= 1; k++){
						for (m = 0; m <= 1;m++){
							if (field[k][m] == FILLED){
								num_mines_touching++;
							}
						}	
					}
				} else if (i == 0 && j == y-1){ //Top right
					for (k = 0; k <= 1; k++){
						for (m = j-1; m <= j;m++){
							if (field[k][m] == FILLED){
								num_mines_touching++;
							}
						}	
					}
				} else if (i == 0){ //Top row
					for (k = 0; k <= 1; k++){
						for (m = j-1; m <= j+1;m++){
							if (field[k][m] == FILLED){
								num_mines_touching++;
							}
						}	
					}
				} else if (i == x-1 && j == 0){//Bottom Left
					for (k = i-1; k <= i; k++){
						for (m = j; m <= j+1;m++){
							if (field[k][m] == FILLED){
								num_mines_touching++;
							}
						}	
					}
				} else if (i == x-1 && j == y-1){//Bottom right
					for (k = i-1; k <= i; k++){
						for (m = j-1; m <= j;m++){
							if (field[k][m] == FILLED){
								num_mines_touching++;
							}
						}	
					}
				} else if (i == x-1 ){//Bottom row
					for (k = i-1; k <= i; k++){
						for (m = j-1; m <= j+1;m++){
							if (field[k][m] == FILLED){
								num_mines_touching++;
							}
						}	
					}
				} else if (j == 0){//Left Column
					for (k = i-1; k <= i+1; k++){
						for (m = j; m <= j+1;m++){
							if (field[k][m] == FILLED){
								num_mines_touching++;
							}
						}	
					}
				} else if (j == y-1){//Right Column
					for (k = i-1; k <= i+1; k++){
						for (m = j-1; m <= j;m++){
							if (field[k][m] == FILLED){
								num_mines_touching++;
							}
						}	
					}
				} else	{ //No special case
					for (k = i-1; k <= i+1; k++){
						for (m = j-1; m <= j+1;m++){
							if (field[k][m] == FILLED){
								num_mines_touching++;
							}
						}	
					}
				}
			} else {
				num_mines_touching = -1; //-1 represents the tiles with a mine
			}
			num[i][j] = num_mines_touching;
		}
	}
	
}

//Detects position of mouse and flips the tile corresponding to the mouse locatione
function getPosition(event){
	//Detects mouse position
	var xpos = event.x;
  	var ypos = event.y;

  	var canvas = document.getElementById("board");
  	board = canvas.getContext("2d");

  	xpos -= canvas.offsetLeft;
  	ypos -= canvas.offsetTop;

  	//Finds the tile that was clicked
  	for (i = 0; i < x; i++){
  		for (j = 0; j < y; j++){
  			if (xpos > 20*i && xpos < 20*i + 20 && ypos > 380-20*j && ypos < 380-20*j+20){
  				checkNum(board,i,j);
  			}
  		}
  	}
  	//alert("x:" + xpos + " y:" + ypos);
  	//20*i,380-20*j,20,20
}

//Draws the square onto the board from the position entered
function drawSquare(b,xpos,ypos){
	//Draw the outline of the tiles
	b.rect(20*xpos,380-20*ypos,20,20);
	b.stroke();

	b.fillStyle="#28ACC6";
	b.fillRect(20*i,380-20*j,20,20);
	//Show number/bomb image
	if (tile[xpos][ypos] != -1 && tile[xpos][ypos] != 0){ //Checks if the tile has mines surrounding
		b.font = "Trebuchet";
		b.fillStyle="#000";
		b.fillText(tile[xpos][ypos],20*xpos + 6,380-20*ypos+15,20);
	} else { //Draw mine
		b.fillStyle="000";
		b.arc(20*i + 10, 380-20*j + 10,7,0,2*Math.PI);
		b.stroke();
	}

	//Write the number of mines remaining
	b.font = "bold 20px Trebuchet";
	b.fillStyle="#FF0000";
	var str = "" + num_mines_remaining;
	b.fillText(str,30,45);
}

//Checks the number of the selected tile and performs an action (only called after that tile has been clicked)
function checkNum(b,xpos,ypos){
	//Checks if the selected tile is a mine
	if (tile[xpos][ypos] == 0){//If there is no mine surrounding, continue revealing nearby tiles	
	} else if (tile[xpos][ypos] != -1){ //Draws normally if the tile is not a mine
		drawSquare(b,xpos,ypos);
	} else { //Draws all the mines
		for (i = 0; i < x; i++){
  			for (j = 0; j < y; j++){
	  			if (tile[i][j] == -1){
	  				drawSquare(b,i,j);
	  			}
  			}
  		}	
	}
}