/*
 * Alternative implementation of a class in javascript
 */
function Employee(fullName) {

	/*
	 * Static attributes
	 */
	Employee.max = 99;
	
	/*
	 * Static methods
	 */
	Employee.log = function(str) {
		console.log("Employee " + str);
	}

	/*
	 * Attributes
	 */
	this.fullName = fullName;

	/*
	 * Methods
	 */
	this.getFullName = function() {
		return this.fullName;
	};

	this.setFullName = function(fullName) {
		this.fullName = fullName;
	}
}

var emp1 = new Employee("John Doe");
console.log("emp1=" + emp1.getFullName());

var emp2 = new Employee();
emp2.setFullName("Jane Doe");
console.log("emp2=" + emp2.getFullName());

console.log("max=" + Employee.max);
Employee.log("logging");