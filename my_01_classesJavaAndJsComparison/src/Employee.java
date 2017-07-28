public class Employee {
	/*
	 * Static attributes
	 */
	public static int max = 99;

	/*
	 * Static methods
	 */
	public static void log() {
		System.out.println("Logging...");
	}

	/*
	 * Constructor
	 */
	public Employee(String fullName) {
		this.fullName = fullName;
	}

	public Employee() {
	}

	/*
	 * Attributes
	 */
	private String fullName;

	/*
	 * Methods
	 */
	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public int generateId() {
		return this.fullName.hashCode();
	}

	public static void main(String[] args) {
		Employee.log(); // logs "Logging..."

		Employee emp1 = new Employee("John Doe");
		System.out.println("emp1=" + emp1.getFullName());

		Employee emp2 = new Employee();
		emp2.setFullName("Jane Doe");
		System.out.println("emp2=" + emp2.getFullName());

		System.out.println("max=" + Employee.max);
		System.out.println("max=" + emp2.max);

		/*
		 * Odds
		 */
		// Employee.setFullName("Employee Class"); // you can't call it, no meaning...

		// System.out.println(Employee.getFullName()); // you can't call it, no
		// meaning...
		// traces undefined

		Employee emp3 = new Employee();
		System.out.println("emp3=" + emp3.getFullName()); // null string, as expected, correct!
	}
}
