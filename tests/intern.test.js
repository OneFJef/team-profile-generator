const Intern = require("../lib/intern");

describe("newIntern", () => {
  it("should create an object with employee 'name', 'id', 'email' address, and 'school'", () => {
    const newIntern = new Intern("Jef", 1, "jef@project87.net", "UNH");
    expect(newIntern).toEqual({ name: "Jef", id: 1, email: "jef@project87.net", school: "UNH"});
  });
  it("should return the word in the name of the function that follows 'get'", () => {
    const newIntern = new Intern("Jef", 1, "jef@project87.net", "UNH");

    const internSchool = newIntern.getSchool()
    const internRole = newIntern.getRole()

    expect(internSchool).toEqual("UNH")
    expect(internRole).toEqual("Intern")
  })
});
