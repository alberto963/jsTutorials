public class Salesman extends Employee {

	private String department;

	public Salesman(String fullName, String department) {
		super(fullName);

		this.department = department;
	}

	public Salesman() {
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public static void main(String[] args) {
		Salesman.log(); // logs "Logging..."

		Employee emp1 = new Salesman("John Doe", "pants");
		System.out.println("emp1=" + emp1.getFullName());

		Salesman emp2 = new Salesman();
		emp2.setFullName("Jane Doe");
		emp2.setDepartment("shirts");
		System.out.println("emp2=" + emp2.getFullName());
		
		System.out.println("id1=" + emp1.generateId());
		System.out.println("id2=" + emp2.generateId());
	}
}
