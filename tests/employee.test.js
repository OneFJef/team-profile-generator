const Employee = require("../lib/employee");

describe("NewEmployee", () => {
  it("should create an object with employee 'name', 'id', and 'email' address", () => {
    const newEmployee = new Employee("Jef", 1, "jef@project87.net");
    expect(newEmployee).toEqual({ name: "Jef", id: 1, email: "jef@project87.net"});
  });
  it("should return the word in the name of the function that follows 'get'", () => {
    const newEmployee = new Employee("Jef", 1, "jef@project87.net");

    const employeeName = newEmployee.getName()
    const employeeId = newEmployee.getId()
    const employeeEmail = newEmployee.getEmail()
    const employeeRole = newEmployee.getRole()

    expect(employeeName).toEqual("Jef")
    expect(employeeId).toEqual(1)
    expect(employeeEmail).toEqual("jef@project87.net")
    expect(employeeRole).toEqual("Employee")
  })
});
