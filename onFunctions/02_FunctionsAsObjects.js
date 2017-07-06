/**
 * 
 */
var Employee = (function() {
	var claxx = function(fullName) {
		this.fullName = fullName;
	}

	claxx.log = function() {
		console.log("Logging...");
	}

	claxx.prototype = {
		setFullName : function(fullName) {
			this.fullName = fullName;
		},
		getFullName : function() {
			return this.fullName;
		}
	};

	return claxx;
})();

Employee.log(); // logs "Logging..."

var emp1 = new Employee("John Doe");
console.log("emp1=" + emp1.getFullName());

var emp2 = new Employee();
emp2.setFullName("Jane Doe");
console.log("emp2=" + emp2.getFullName());

/*
 * Odds
 */
Employee.prototype.setFullName("Employee Class"); // you can call it, no meaning... 
console.log(Employee.prototype.getFullName()); // you can call it, no meaning... traces undefined
var emp3 = new Employee();
console.log("emp3=" + emp3.getFullName());  // undefined, correct!
