const Manager = require("../lib/manager");

describe("newManager", () => {
  it("should create an object with employee 'name', 'id', 'email' address, and 'officeNumber'", () => {
    const newManager = new Manager("Jef", 1, "jef@project87.net", 5);
    expect(newManager).toEqual({ name: "Jef", id: 1, email: "jef@project87.net", officeNumber: 5});
  });
  it("should return the word in the name of the function that follows 'get'", () => {
    const newManager = new Manager("Jef", 1, "jef@project87.net", 5);

    const managerOfficeNumber = newManager.getOfficeNumber()
    const managerRole = newManager.getRole()

    expect(managerOfficeNumber).toEqual(5)
    expect(managerRole).toEqual("Manager")
  })
});
