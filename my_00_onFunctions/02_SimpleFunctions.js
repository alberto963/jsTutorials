/*
 * Define function (a function is an object)
 */
function F() {
	console.log("F");
}

/*
 * Call function
 */
F(); // output 'F'

/*
 * Define function var
 */
var f0 = F;
f0(); // output 'F'

/*
 * Add an attribute to function object F. This new attribute is a function (g)
 */
F.g = function() {
	console.log("g");
}

/*
 * Call it naming F object
 */
F.g(); // output 'g'

/*
 * Call it naming it with function var f0
 */
f0.g(); // output 'g'

/*
 * Use new keyword to create new objects from the same prototype
 */
var f1 = new F(); // output 'F'
/*
 * TypeError: f1.g is not a function: we get this error because g is not in the
 * prototype of F
 */

// f1.g();

/*
 * We can add a new attribute to f1 object named g that has nothing to do with g
 * in F
 */
f1.g = function() {
	console.log("f1 g");
}
f1.g(); // output 'f1 g'

F.g(); // output 'g'
f0.g(); // output 'g'

/*
 * Instead if we modify F prototype we get new function in new object
 */
F.prototype.g1 = function() {
	console.log("g1");
}
var f2 = new F(); // output 'F'
f2.g1(); // output 'g1'

/*
 * f1 created before addition in F prototype of g1 will contain g1 function?
 * Yes!
 */
f1.g1(); // output 'g1'

/*
 * Can we apply new keyword to f2 function? No, we get TypeError: f2 is not a
 * constructor.
 * 
 */
//var f3 = new f2();


