/**
 * 
 */

var myGamePiece;
var crossLines = [];
var myScore;

function startGame() {

	//gameArea.start();

	$('canvas').click(function() {
		$(this).toggleClass('red');
	});
}

var gameArea = {
	canvas : document.createElement("canvas"),
	start : function() {
		this.canvas.width = 310;
		this.canvas.height = 310;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		updateGameArea();
	},
	clear : function() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function component(width, height, color, x, y, type) {
	this.type = type;
	this.score = 0;
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.x = x;
	this.y = y;
	this.gravity = 0;
	this.gravitySpeed = 0;

	this.update = function() {
		ctx = gameArea.context;
		if (this.type == "text") {
			ctx.font = this.width + " " + this.height;
			ctx.fillStyle = color;
			ctx.fillText(this.text, this.x, this.y);
		} else {
			ctx.fillStyle = color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		}
	}

	this.newPos = function() {
		this.gravitySpeed += this.gravity;
		this.x += this.speedX;
		this.y += this.speedY + this.gravitySpeed;
		this.hitBottom();
	}

	this.hitBottom = function() {
		var rockbottom = gameArea.canvas.height - this.height;
		if (this.y > rockbottom) {
			this.y = rockbottom;
			this.gravitySpeed = 0;
		}
	}

	this.crashWith = function(otherobj) {
		var myleft = this.x;
		var myright = this.x + (this.width);
		var mytop = this.y;
		var mybottom = this.y + (this.height);
		var otherleft = otherobj.x;
		var otherright = otherobj.x + (otherobj.width);
		var othertop = otherobj.y;
		var otherbottom = otherobj.y + (otherobj.height);
		var crash = true;
		if ((mybottom < othertop) || (mytop > otherbottom)
				|| (myright < otherleft) || (myleft > otherright)) {
			crash = false;
		}

		return crash;
	}
}

function updateGameArea() {
	var x, y, width, height;

	gameArea.clear();
	x = gameArea.canvas.width;
	y = gameArea.canvas.height;
	width = x;
	height = y;

	/*
	 * Vertical lines
	 */
	crossLines.push(new component(10, height, "black", 100, 0));
	crossLines.push(new component(10, height, "black", 200, 0));

	/*
	 * Orizontal lines
	 */
	crossLines.push(new component(width, 10, "black", 0, 100));
	crossLines.push(new component(width, 10, "black", 0, 200));

	for (i = 0; i < crossLines.length; i += 1) {
		crossLines[i].update();
	}

}