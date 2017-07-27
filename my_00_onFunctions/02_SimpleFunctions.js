/*
 * Define function
 */
function F() {
	console.log("F");
}

/*
 * Call function
 */
F(); // output 'F"

var f0 = F;
f0(); // output 'F"

F.g = function() {
	console.log("g");
}
F.g(); // output 'g"
f0.g(); // output 'g"

var f1 = new F(); // output 'F"
/*
 * TypeError: f1.g is not a function
 */
// f1.g();
