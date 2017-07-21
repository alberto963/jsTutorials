/**
 * 
 */
function startGame() {
	game.start();
}

var game = {
	emptyTiles : [],
	redTiles : [],
	greenTiles : [],
	start : function() {

		var count = 0;
		$("canvas").each(function() {
			var $thisTile = $(this);
			$thisTile.click(function() {

				if ($(this).is(".red") || $(this).is(".green")) {
					return;
				}

				count++;
				$(this).toggleClass("green");

				console.info("count=" + count)

				check();
				play();
			});
		});
	},
	clear(){
		
	}
}

function play() {

	var emptyTiles = [];
	$("canvas").each(function() {

		if ($(this).is(".red") || $(this).is(".green")) {
			return;
		}

		emptyTiles.push($(this));
	});

	console.info("emptyTiles=" + emptyTiles);

	move(emptyTiles);
}

function move(emptyTiles) {
	/*
	 * Random move
	 */
	var move = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];

	console.info("move=" + move);

	$(move).toggleClass("red");
}

function check() {
	$("canvas").each(function() {

		if ($(this).is(".red")) {
			game.redTiles.push($(this));

			return;
		}

		if ($(this).is(".green")) {
			game.greenTiles.push($(this));

			return;
		}

		game.emptyTiles.push($(this));
	});
}