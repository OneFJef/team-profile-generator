const Engineer = require("../lib/engineer");

describe("newEngineer", () => {
  it("should create an object with employee 'name', 'id', 'email' address, and 'github' account", () => {
    const newEngineer = new Engineer("Jef", 1, "jef@project87.net", "OneFJef");
    expect(newEngineer).toEqual({ name: "Jef", id: 1, email: "jef@project87.net", github: "OneFJef"});
  });
  it("should return the word in the name of the function that follows 'get'", () => {
    const newEngineer = new Engineer("Jef", 1, "jef@project87.net", "OneFJef");

    const engineerGithub = newEngineer.getGithub()
    const engineerRole = newEngineer.getRole()

    expect(engineerGithub).toEqual("OneFJef")
    expect(engineerRole).toEqual("Engineer")
  })
});
