/*
 * Define function (a function is an object)
 */
function F(a, b) {
	this.getS = function() {
		return this.s;
	};
	
	this.s = a + b;

	console.log("F s=" + this.s);
}

function F1(a, b) {
	// F.call(this, a, b); // call super constructor.
	F.apply(this, arguments);
	
	this.getP = function() {
		return this.p;
	};
	
	this.p = a * b;

	console.log("F1 p=" + this.p);
}

/*
 * The Object.create() method creates a new object with the specified prototype
 * object and properties.
 */
F1.prototype = Object.create(F.prototype);
var f_o = Object.create(F.prototype);

F1.prototype.constructor = F1;

f1 = new F1(1, 2);
console.log('f1 is ' + f1);
console.log('f1 keys are ' + Object.keys(f1));
console.log('f1.prototype is ' + f1.prototype);
console.log('f1.constructor is ' + f1.constructor.name);
console.log('f1.getS() is ' + f1.getS());
console.log('f1.getP() is ' + f1.getP());

f2 = new F1(3, 4);
console.log('f2.getS() is ' + f2.getS());
console.log('f2.getP() is ' + f2.getP());

console.log('f1.getS() is ' + f1.getS());
console.log('f1.getP() is ' + f1.getP());

console.log("-");
