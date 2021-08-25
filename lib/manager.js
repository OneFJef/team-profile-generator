const Employee = require("./employee");
const emailValidator = require("email-validator");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
  getRole() {
    return questions;
  }
}

const questions = [
  {
    name: "name",
    message: "What is the Manager's name?",
  },
  {
    name: "id",
    message: "What is the Manager's id?",
  },
  {
    name: "email",
    message: "What is the Manager's email?",
    validate(input) {
      if (emailValidator.validate(input)) {
        return true;
      } else {
        return "Please enter a valid email address.";
      }
    },
  },
  {
    name: "officeNumber",
    message: "What is the Manager's office number?",
  },
  {
    type: "list",
    name: "addRole",
    message: "Which team member would you like to add?",
    choices: [
      "Engineer",
      "Intern",
      "I don't want to add anymore team members.",
    ],
  },
];

module.exports = Manager;
