public class Employee {

	private String fullName;

	public Employee(String fullName) {
		this.fullName = fullName;
	}

	public Employee() {
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public static void log() {
		System.out.println("Logging...");
	}

	public static void main(String[] args) {
		Employee.log(); // logs "Logging..."

		Employee emp1 = new Employee("John Doe");
		System.out.println("emp1=" + emp1.getFullName());

		Employee emp2 = new Employee();
		emp2.setFullName("Jane Doe");
		System.out.println("emp2=" + emp2.getFullName());

		/*
		 * Odds
		 */
		// Employee.setFullName("Employee Class"); // you can call it, no meaning...

		// System.out.println(Employee.getFullName()); // you can call it, no meaning...
		// traces undefined

		Employee emp3 = new Employee();
		System.out.println("emp3=" + emp3.getFullName()); // null string, as expected, correct!
	}
}
