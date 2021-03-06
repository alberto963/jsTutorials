/**
 * 
 */
function startGame() {
	game.start();
}

var game = {

	winConf : [ [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7, 8 ], [ 0, 3, 6 ],
			[ 1, 4, 7 ], [ 2, 5, 8 ], [ 0, 4, 8 ], [ 2, 4, 6 ] ],

	win : false,

	count : 0,

	start : function() {

		$("canvas").each(function() {
			var $thisTile = $(this);
			$thisTile.click(function() {

				if (game.win) {
					return;
				}

				if ($(this).is(".red") || $(this).is(".green")) {
					return;
				}

				game.count++;
				$(this).toggleClass("green");

				console.info("count=" + game.count)

				var t = $(this).attr('id');
				play(t);
			});
		});
	},
	clear : function() {

	}
}

function play(t) {
	var winConf = check(t, ".green");
	if (winConf.length == 0) {
		var r = move();

		game.count++;

		var winConf = check(r, ".red");

		if (winConf.length != 0) {
			/*
			 * Red wins
			 */
			console.info("RED WINS")

			showWin(winConf, "red");

			game.win = true;
		}

		return;
	}

	/*
	 * Green wins
	 */
	console.info("GREEN WINS")

	showWin(winConf, "green");

	game.win = true;
}

function move() {

	var emptyTiles = [];

	$("canvas").each(function() {

		if ($(this).is(".red")) {

			return;
		}

		if ($(this).is(".green")) {

			return;
		}

		emptyTiles.push($(this));
	});

	/*
	 * Check if red is winning
	 */
	var r = checkMove(emptyTiles, "red");

	/*
	 * Check if green is winning
	 */
	var g = checkMove(emptyTiles, "green");

	/*
	 * Random move if not winning configuration
	 */
	var move = (r != -1) ? $("#" + r) : (g != -1) ? $("#" + g)
			: emptyTiles[Math.floor(Math.random() * emptyTiles.length)];

	console.info("move=" + move);

	$(move).toggleClass("red");

	var r = $(move).attr('id');

	return r

	function checkMove(emptyTiles, player) {
		var r = -1;
		emptyTiles.some(function(e) {
			r = $(e).attr('id');
			$(e).toggleClass(player);
			var winConf = check(r, "." + player);
			if (winConf.length != 0) {
				$(e).toggleClass(player);

				return true;
			}

			$(e).toggleClass(player);

			r = -1;
			return false;
		})

		return r;
	}
}

function check(t, player) {
	var winConf = [];

	var possConf = [ [] ];
	var t_i = parseInt(t, 10);
	game.winConf.forEach(function(c) {
		if (c.indexOf(t_i) != -1) {
			possConf.push(c);
		}
	})

	console.info("possConf=" + possConf);

	possConf.some(function(c) {
		var f = 0;
		c.some(function(c0) {
			/*
			 * If it is in increase f and return false
			 * 
			 * If it is not in return true
			 */
			var found = $("#" + c0).is(player);
			if (found) {
				f++;
			}

			return !found;
		})
		var win = (f == 3);

		if (win) {
			winConf = c;
		}

		return win;
	})

	return winConf;
}

function showWin(winConf, winner) {

	$("canvas").each(function() {

		var t_i = parseInt($(this).attr('id'), 10);
		if (winConf.indexOf(t_i) != -1) {
			$(this).toggleClass(winner + "-win");

			return;
		}
	});
}
