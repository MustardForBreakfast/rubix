

var cube = 		["Red","Red","Red","Red","Red","Red","Red","Red","Red",
			"Blu","Blu","Blu","Blu","Blu","Blu","Blu","Blu","Blu",
			"Wht","Wht","Wht","Wht","Wht","Wht","Wht","Wht","Wht",
			"Grn","Grn","Grn","Grn","Grn","Grn","Grn","Grn","Grn",
			"Ylw","Ylw","Ylw","Ylw","Ylw","Ylw","Ylw","Ylw","Ylw",
			"Org","Org","Org","Org","Org","Org","Org","Org","Org"];
// 1) index 0 - 8:     						[Red,Red,Red,Red,Red,Red,Red,Red,Red,
// 2) index 9 - 17:    						Blu,Blu,Blu,Blu,Blu,Blu,Blu,Blu,Blu,
// reference) index 18 - 26:   					Wht,Wht,Wht,Wht,Wht,Wht,Wht,Wht,Wht,
// 3) index 27 - 35:   						Grn,Grn,Grn,Grn,Grn,Grn,Grn,Grn,Grn
// 4) index 36 - 44:   						Ylw,Ylw,Ylw,Ylw,Ylw,Ylw,Ylw,Ylw,Ylw
// 5) index 45 - 53:   						Org,Org,Org,Org,Org,Org,Org,Org,Org]

//to add a sticker, set index#22 to value "sticker"
//to remove a sticker, set index#22 to "Wht"


//for backtracking/solving the cube
var moves = [];

var init = function(){
	populateSides();
	$("#scramble").on("click", function(){
		scrambleCube();
	});

	$("#solve").on("click", function(){
		solveCube();
	})

	//action for Z axis buttons
	$("#backCC").on("click", function(){
		rot_ZLeftBack();
	});
	$("#midCC").on("click", function(){
		rot_ZLeftMid();
	});
	$("#frontCC").on("click", function(){
		rot_ZLeftFront();
	})
	$("#backCW").on("click", function(){
		rot_ZRightBack();
	})
	$("#midCW").on("click", function(){
		rot_ZRightMid();
	})
	$("#frontCW").on("click", function(){
		rot_ZRightFront();
	})

	//action for Y axis buttons
	$("#YUpLeft").on("click", function(){
		rot_YUpLeft();
	});
	$("#YUpMid").on("click", function(){
		rot_YUpMid();
	});
	$("#YUpRight").on("click", function(){
		rot_YUpRight();
	});
	$("#YDownLeft").on("click", function(){
		rot_YDownLeft();
	});
	$("#YDownMid").on("click", function(){
		rot_YDownMid();
	});
	$("#YDownRight").on("click", function(){
		rot_YDownRight();
	});


	//action for X axis buttons
	$("#XLeftTop").on("click", function(){
		rot_XLeftTop();
	});
	$("#XRightTop").on("click", function(){
		rot_XRightTop();
	});
	$("#XLeftMid").on("click", function(){
		rot_XLeftMid();
	});
	$("#XRightMid").on("click", function(){
		rot_XRightMid();
	});
	$("#XLeftBot").on("click", function(){
		rot_XLeftBot();
	});
	$("#XRightBot").on("click", function(){
		rot_XRightBot();
	});
}

var printCube= function(cb){
	console.log("0-8: ",cb.slice(0,9));
	console.log("9-17: ",cb.slice(9,18));
	console.log("Ref! 18-26: ",cb.slice(18,27));
	console.log("27-35: ",cb.slice(27,36));
	console.log("36-44: ",cb.slice(36,45));
	console.log("45-53: ",cb.slice(45));
}

var render = function(){
	clearSides();
	populateSides();
}


var populateSides = function(){
	for (var i=0; i<cube.length; i++){
		addSquare(i);
	}
}

var clearSides = function(){
	$(".side").empty();
}

var addSquare = function(index){
	var $square = $('<div class="square" id='+index.toString()+'></div>');
	//use string values in cube to assign the correct css properties to the incoming square
	switch(cube[index]){
		case "Red":
			$square.addClass("red");
			break;
		case "Blu":
			$square.addClass("blue");
			break;
		case "Wht":
			$square.addClass("white");
			break;
		case "Grn":
			$square.addClass("green");
			break;
		case "Ylw":
			$square.addClass("yellow");
			break;
		case "Org":
			$square.addClass("orange");
			break;
		//NOTE: change index#22 of cube from "Wht" to "sticker" to use this.
		case "sticker":
			$square.addClass("sticker")
	}
	
	//use the cube index# to determine which face of the cube to put the incoming square
	if (index>=0 && index<9){
			$("#side1").append($square);
		}
			
	else if(index>8 && index<18){
			$("#side2").append($square);
		}
			
	else if(index>17 && index<27){
			$("#reference").append($square);
		}

	else if(index>26 && index<36){
			$("#side3").append($square);
		}

	else if(index>35 && index<45){
			$("#side4").append($square);
		}

	else if(index>44){
			$("#side5").append($square);
		}
	
}


var scrambleCube = function(){
	//randomly execute 20 movements on the cube
	//Why 20 movements? Well, why not? Increase or decrease as you see fit.
	
	console.log("scrambling the cube in 20 moves: ")

	for (var i=0; i<20; i++){
		console.log("\n")
		console.log("Move #"+(i+1)+" :")
		var randomNum = Math.floor((Math.random()*18)+1)
		switch(randomNum){
			case 1: 
				rot_XRightTop();
				break;
			case 2:
				rot_XLeftTop();
				break;
			case 3:
				rot_XRightMid();
				break;
			case 4:
				rot_XLeftMid();
				break;
			case 5:
				rot_XRightBot();
				break;
			case 6:
				rot_XLeftBot();
				break;
			case 7:
				rot_YUpLeft();
				break;
			case 8:
				rot_YDownLeft();
				break;
			case 9:
				rot_YUpMid();
				break;
			case 10:
				rot_YDownMid();
				break;
			case 11:
				rot_YUpRight();
				break;
			case 12:
				rot_YDownRight();
				break;
			case 13:
				rot_ZRightFront();
				break;
			case 14:
				rot_ZLeftFront();
				break;
			case 15:
				rot_ZRightMid();
				break;
			case 16:
				rot_ZLeftMid();
				break;
			case 17:
				rot_ZRightBack();
				break;
			case 18:
				rot_ZLeftBack();
				break;
		}
		if (i===19){
			console.log("***The cube has been scrambled.***")
		}
	}

}

var solveCube = function(){
	//NOTE: Just a placeholder method for now. For V1.0, solveCube simply iterates backwards through the moves array 
	//and unMoves for each value found. A real solve method (that does not rely on a move history) is in the works.

	//uses setTimeout to make moves visible to the user
	var movesCopy = moves.slice();
	var delay = 100;

	setTimeout(function(){
		unMove();
		if(moves.length>0){
			solveCube();
		}
	}, delay);
}

var unMove = function(){

	switch(moves[moves.length-1]){
			case 1: 
				rot_XRightTop();
				break;
			case 2:
				rot_XLeftTop();
				break;
			case 3:
				rot_XRightMid();
				break;
			case 4:
				rot_XLeftMid();
				break;
			case 5:
				rot_XRightBot();
				break;
			case 6:
				rot_XLeftBot();
				break;
			case 7:
				rot_YUpLeft();
				break;
			case 8:
				rot_YDownLeft();
				break;
			case 9:
				rot_YUpMid();
				break;
			case 10:
				rot_YDownMid();
				break;
			case 11:
				rot_YUpRight();
				break;
			case 12:
				rot_YDownRight();
				break;
			case 13:
				rot_ZRightFront();
				break;
			case 14:
				rot_ZLeftFront();
				break;
			case 15:
				rot_ZRightMid();
				break;
			case 16:
				rot_ZLeftMid();
				break;
			case 17:
				rot_ZRightBack();
				break;
			case 18:
				rot_ZLeftBack();
				break;
		}

 moves.pop();
 moves.pop(); //yes, this needs to happen twice.

}



//Take a deep breath... here comes a slog!

//Rotation methods:
		//For X:

var rot_XRightTop = function(){
	var tempCube = cube.slice();

	cube[18] = tempCube[9];
	cube[19] = tempCube[10];
	cube[20] = tempCube[11];
	cube[27] = tempCube[18];
	cube[28] = tempCube[19];
	cube[29] = tempCube[20];
	cube[36] = tempCube[27];
	cube[37] = tempCube[28];
	cube[38] = tempCube[29];
	cube[9] = tempCube[36];
	cube[10] = tempCube[37];
	cube[11] = tempCube[38];
	//rotates side 1:
	cube[8] = tempCube[6];
	cube[5] = tempCube[7];
	cube[2] = tempCube[8];
	cube[1] = tempCube[5];
	cube[0] = tempCube[2];
	cube[3] = tempCube[1];
	cube[6] = tempCube[0];
	cube[7] = tempCube[3];

	console.log("Turned the top row to the right on the X-Axis")
	printCube(cube);
	moves.push(2);
	render();
}

var rot_XRightMid = function(){
	var tempCube = cube.slice()

	cube[21] = tempCube[12];
	cube[22] = tempCube[13];
	cube[23] = tempCube[14];
	cube[30] = tempCube[21];
	cube[31] = tempCube[22];
	cube[32] = tempCube[23];
	cube[39] = tempCube[30];
	cube[40] = tempCube[31];
	cube[41] = tempCube[32];
	cube[12] = tempCube[39];
	cube[13] = tempCube[40];
	cube[14] = tempCube[41];

	console.log("Turned the middle row to the right on the X-Axis")
	printCube(cube);
	moves.push(4)
	render();
}

var rot_XRightBot = function(){
	
var tempCube = cube.slice();

	cube[24] = tempCube[15];
	cube[25] = tempCube[16];
	cube[26] = tempCube[17];
	cube[33] = tempCube[24];
	cube[34] = tempCube[25];
	cube[35] = tempCube[26];
	cube[42] = tempCube[33];
	cube[43] = tempCube[34];
	cube[44] = tempCube[35];
	cube[15] = tempCube[42];
	cube[16] = tempCube[43];
	cube[17] = tempCube[44];
	//rotates side 6
	cube[47] = tempCube[45];
	cube[50] = tempCube[46];
	cube[53] = tempCube[47];
	cube[52] = tempCube[50];
	cube[51] = tempCube[53];
	cube[48] = tempCube[52];
	cube[45] = tempCube[51];
	cube[46] = tempCube[48];

	console.log("Turned the bottom row to the right on the X-Axis")
	printCube(cube);
	moves.push(6);
	render();
}

var rot_XLeftTop = function(){

var tempCube = cube.slice();

	cube[9] = tempCube[18];
	cube[10] = tempCube[19];
	cube[11] = tempCube[20];
	cube[18] = tempCube[27];
	cube[19] = tempCube[28];
	cube[20] = tempCube[29];
	cube[27] = tempCube[36];
	cube[28] = tempCube[37];
	cube[29] = tempCube[38];
	cube[36] = tempCube[9];
	cube[37] = tempCube[10];
	cube[38] = tempCube[11];
	//rotates side 1
	cube[6] = tempCube[8];
	cube[7] = tempCube[5];
	cube[8] = tempCube[2];
	cube[5] = tempCube[1];
	cube[2] = tempCube[0];
	cube[1] = tempCube[3];
	cube[0] = tempCube[6];
	cube[3] = tempCube[7];

	console.log("Turned the top row to the left on the X-Axis")
	printCube(cube);
	moves.push(1);
	render();
}

var rot_XLeftMid = function(){

var tempCube = cube.slice();

	cube[12] = tempCube[21];
	cube[13] = tempCube[22];
	cube[14] = tempCube[23];
	cube[21] = tempCube[30];
	cube[22] = tempCube[31];
	cube[23] = tempCube[32];
	cube[30] = tempCube[39];
	cube[31] = tempCube[40];
	cube[32] = tempCube[41];
	cube[39] = tempCube[12];
	cube[40] = tempCube[13];
	cube[41] = tempCube[14];

	console.log("Turned the middle row to the left on the X-Axis")
	printCube(cube);
	moves.push(3);
	render();
}

var rot_XLeftBot = function(){

var tempCube = cube.slice();

	cube[15] = tempCube[24];
	cube[16] = tempCube[25];
	cube[17] = tempCube[26];
	cube[24] = tempCube[33];
	cube[25] = tempCube[34];
	cube[26] = tempCube[35];
	cube[33] = tempCube[42];
	cube[34] = tempCube[43];
	cube[35] = tempCube[44];
	cube[42] = tempCube[15];
	cube[43] = tempCube[16];
	cube[44] = tempCube[17];
	//rotates side 6
	cube[45] = tempCube[47];
	cube[46] = tempCube[50];
	cube[47] = tempCube[53];
	cube[50] = tempCube[52];
	cube[53] = tempCube[51];
	cube[52] = tempCube[48];
	cube[51] = tempCube[45];
	cube[48] = tempCube[46];

	console.log("Turned the bottom row to the left on the X-Axis")
	printCube(cube);
	moves.push(5);
	render();
}

		//For Y:

var rot_YUpLeft = function(){

var tempCube = cube.slice();

	cube[0] = tempCube[18];
	cube[3] = tempCube[21];
	cube[6] = tempCube[24];
	cube[44] = tempCube[0];
	cube[41] = tempCube[3];
	cube[38] = tempCube[6];
	cube[45] = tempCube[44];
	cube[48] = tempCube[41];
	cube[51] = tempCube[38];
	cube[18] = tempCube[45];
	cube[21] = tempCube[48];
	cube[24] = tempCube[51];
	//rotates side 2
	cube[9] = tempCube[11];
	cube[12] = tempCube[10];
	cube[15] = tempCube[9];
	cube[16] = tempCube[12];
	cube[17] = tempCube[15];
	cube[14] = tempCube[16];
	cube[11] = tempCube[17];
	cube[10] = tempCube[14];

	console.log("Spun the left column upward on the Y-Axis")
	printCube(cube);
	moves.push(8);
	render();
}

var rot_YUpMid = function(){

var tempCube = cube.slice();

	cube[1] = tempCube[19];
	cube[4] = tempCube[22];
	cube[7] = tempCube[25];
	cube[43] = tempCube[1];
	cube[40] = tempCube[4];
	cube[37] = tempCube[7];
	cube[52] = tempCube[37];
	cube[49] = tempCube[40];
	cube[46] = tempCube[43];
	cube[19] = tempCube[46];
	cube[22] = tempCube[49];
	cube[25] = tempCube[52];

	console.log("Spun the middle column upward on the Y-Axis")
	printCube(cube);
	moves.push(10);
	render();
}

var rot_YUpRight = function(){

var tempCube = cube.slice();

	cube[2] = tempCube[20];
	cube[5] = tempCube[23];
	cube[8] = tempCube[26];
	cube[42] = tempCube[2];
	cube[39] = tempCube[5];
	cube[36] = tempCube[8];
	cube[53] = tempCube[36];
	cube[50] = tempCube[39];
	cube[47] = tempCube[42];
	cube[20] = tempCube[47];
	cube[23] = tempCube[50];
	cube[26] = tempCube[53];
	//rotates side 3
	cube[29] = tempCube[27];
	cube[32] = tempCube[28];
	cube[35] = tempCube[29];
	cube[34] = tempCube[32];
	cube[33] = tempCube[35];
	cube[30] = tempCube[34];
	cube[27] = tempCube[33];
	cube[28] = tempCube[30];

	console.log("Spun the right column upward on the Y-Axis")
	printCube(cube);
	moves.push(12);
	render();
}

var rot_YDownLeft = function(){

var tempCube = cube.slice();

	cube[18] = tempCube[0];
	cube[21] = tempCube[3];
	cube[24] = tempCube[6];
	cube[0] = tempCube[44];
	cube[3] = tempCube[41];
	cube[6] = tempCube[38];
	cube[44] = tempCube[45];
	cube[41] = tempCube[48];
	cube[38] = tempCube[51];
	cube[45] = tempCube[18];
	cube[48] = tempCube[21];
	cube[51] = tempCube[24];
	//rotates side 2:
	cube[11] = tempCube[9];
	cube[10] = tempCube[12];
	cube[9] = tempCube[15];
	cube[12] = tempCube[16];
	cube[15] = tempCube[17];
	cube[16] = tempCube[14];
	cube[17] = tempCube[11];
	cube[14] = tempCube[10];

	console.log("Spun the left column downward on the Y-Axis")
	printCube(cube);
	moves.push(7);
	render();
}

var rot_YDownMid = function(){
	
var tempCube = cube.slice();

	cube[19] = tempCube[1];
	cube[22] = tempCube[4];
	cube[25] = tempCube[7];
	cube[1] = tempCube[43];
	cube[4] = tempCube[40];
	cube[7] = tempCube[37];
	cube[37] = tempCube[52];
	cube[40] = tempCube[49];
	cube[43] = tempCube[46];
	cube[46] = tempCube[19];
	cube[49] = tempCube[22];
	cube[52] = tempCube[25];

	console.log("Spun the middle column downward on the Y-Axis")
	printCube(cube);
	moves.push(9);
	render();
}

var rot_YDownRight = function(){

var tempCube = cube.slice();

	cube[20] = tempCube[2];
	cube[23] = tempCube[5];
	cube[26] = tempCube[8];
	cube[2] = tempCube[42];
	cube[5] = tempCube[39];
	cube[8] = tempCube[36];
	cube[36] = tempCube[53];
	cube[39] = tempCube[50];
	cube[42] = tempCube[47];
	cube[47] = tempCube[20];
	cube[50] = tempCube[23];
	cube[53] = tempCube[26];
	//rotates side 3
	cube[27] = tempCube[29];
	cube[28] = tempCube[32];
	cube[29] = tempCube[35];
	cube[32] = tempCube[34];
	cube[35] = tempCube[33];
	cube[34] = tempCube[30];
	cube[33] = tempCube[27];
	cube[30] = tempCube[28];

	console.log("Spun the right column downward on the Y-Axis")
	printCube(cube);
	moves.push(11);
	render();
}

		//For Z:

var rot_ZRightFront = function(){

var tempCube = cube.slice();

	cube[27] = tempCube[6];
	cube[30] = tempCube[7];
	cube[33] = tempCube[8];
	cube[47] = tempCube[27];
	cube[46] = tempCube[30];
	cube[45] = tempCube[33];
	cube[17] = tempCube[47];
	cube[14] = tempCube[46];
	cube[11] = tempCube[45];
	cube[6] = tempCube[17];
	cube[7] = tempCube[14];
	cube[8] = tempCube[11];
	//rotates the reference side
	cube[20] = tempCube[18];
	cube[23] = tempCube[19];
	cube[26] = tempCube[20];
	cube[25] = tempCube[23];
	cube[24] = tempCube[26];
	cube[21] = tempCube[25];
	cube[18] = tempCube[24];
	cube[19] = tempCube[21];

	console.log("Rolled the front grouping to the right on the Z-Axis")
	printCube(cube);
	moves.push(14);
	render();
}

var rot_ZRightMid = function(){

var tempCube = cube.slice();

	cube[28] = tempCube[3];
	cube[31] = tempCube[4];
	cube[34] = tempCube[5];
	cube[50] = tempCube[28];
	cube[49] = tempCube[31];
	cube[48] = tempCube[34];
	cube[16] = tempCube[50];
	cube[13] = tempCube[49];
	cube[10] = tempCube[48];
	cube[3] = tempCube[16];
	cube[4] = tempCube[13];
	cube[5] = tempCube[10];

	console.log("Rolled the middle grouping to the right on the Z-Axis")
	printCube(cube);
	moves.push(16);
	render();
}

var rot_ZRightBack = function(){

var tempCube = cube.slice();

	cube[29] = tempCube[0];
	cube[32] = tempCube[1];
	cube[35] = tempCube[2];
	cube[53] = tempCube[29];
	cube[52] = tempCube[32];
	cube[51] = tempCube[35];
	cube[15] = tempCube[53];
	cube[12] = tempCube[52];
	cube[9] = tempCube[51];
	cube[0] = tempCube[15];
	cube[1] = tempCube[12];
	cube[2] = tempCube[9];
	//rotates side 4
	cube[42] = tempCube[36];
	cube[43] = tempCube[39];
	cube[44] = tempCube[42];
	cube[41] = tempCube[43];
	cube[38] = tempCube[44];
	cube[37] = tempCube[41];
	cube[36] = tempCube[38];
	cube[39] = tempCube[37];

	console.log("Rolled the rear grouping to the right on the Z-Axis")
	printCube(cube);
	moves.push(18);
	render();
}

var rot_ZLeftFront = function(){

var tempCube = cube.slice();

	cube[6] = tempCube[27];
	cube[7] = tempCube[30];
	cube[8] = tempCube[33];
	cube[27] = tempCube[47];
	cube[30] = tempCube[46];
	cube[33] = tempCube[45];
	cube[47] = tempCube[17];
	cube[46] = tempCube[14];
	cube[45] = tempCube[11];
	cube[17] = tempCube[6];
	cube[14] = tempCube[7];
	cube[11] = tempCube[8];
	//rotates the reference side
	cube[18] = tempCube[20];
	cube[19] = tempCube[23];
	cube[20] = tempCube[26];
	cube[23] = tempCube[25];
	cube[26] = tempCube[24];
	cube[25] = tempCube[21];
	cube[24] = tempCube[18];
	cube[21] = tempCube[19];

	console.log("Rolled the front grouping to the left on the Z-Axis")
	printCube(cube);
	moves.push(13);
	render();
}

var rot_ZLeftMid = function(){

var tempCube = cube.slice();

	cube[3] = tempCube[28];
	cube[4] = tempCube[31];
	cube[5] = tempCube[34];
	cube[28] = tempCube[50];
	cube[31] = tempCube[49];
	cube[34] = tempCube[48];
	cube[50] = tempCube[16];
	cube[49] = tempCube[13];
	cube[48] = tempCube[10];
	cube[16] = tempCube[3];
	cube[13] = tempCube[4];
	cube[10] = tempCube[5];

	console.log("Rolled the middle grouping to the left on the Z-Axis")
	printCube(cube);
	moves.push(15);
	render();
}

var rot_ZLeftBack = function(){

var tempCube = cube.slice();

	cube[0] = tempCube[29];
	cube[1] = tempCube[32];
	cube[2] = tempCube[35];
	cube[29] = tempCube[53];
	cube[32] = tempCube[52];
	cube[35] = tempCube[51];
	cube[53] = tempCube[15];
	cube[52] = tempCube[12];
	cube[51] = tempCube[9];
	cube[15] = tempCube[0];
	cube[12] = tempCube[1];
	cube[9] = tempCube[2];
	//rotates side 4
	cube[36] = tempCube[42];
	cube[39] = tempCube[43];
	cube[42] = tempCube[44];
	cube[43] = tempCube[41];
	cube[44] = tempCube[38];
	cube[41] = tempCube[37];
	cube[38] = tempCube[36];
	cube[37] = tempCube[39];

	console.log("Rolled the rear grouping to the left on the Z-Axis")
	printCube(cube);
	moves.push(17);
	render();
}
