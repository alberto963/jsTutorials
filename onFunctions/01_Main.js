/**
 * --- Main function (to be called by node.js)
 */
(function Main() {

	/*
	 * Define function g1
	 */
	function g1() {
		console.log("g1 this=" + this);
	}

	/*
	 * Define function F
	 */
	function F(g) {
		this.g = g;

		function m(g) {
			console.log("m this=" + this);

			g();
		}

		switch (g) {

		case g1: {
			console.log("g1 this=" + this);

			break;
		}

		default: {
			console.log("other this=" + this);

			break;
		}

		}

		m(g);
	}

	/*
	 * Call function F
	 */
	F(g1);
	F(function() {
		console.log("anonymous this=" + this);
	});

	var o1 = new F(function() {
		console.log("new F this=" + this);
	});

	console.log("Main o1=" + o1 + " o1.g=" + o1.g);

})();