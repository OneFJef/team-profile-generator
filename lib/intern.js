const emailValidator = require("email-validator");

const Employee = require("./employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }
  getSchool() {
    return this.school;
  }

  getRole() {
    return "Intern";
  }

  getQuestions() {
    return questions;
  }
}

const questions = [
  {
    name: "name",
    message: "What is the intern's name?",
  },
  {
    name: "id",
    message: "What is the intern's id?",
  },
  {
    name: "email",
    message: "What is the intern's email?",
    validate(input) {
      if (emailValidator.validate(input)) {
        return true;
      } else {
        return "Please enter a valid email address.";
      }
    },
  },
  {
    name: "school",
    message: "What school does the intern attend?",
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

module.exports = Intern;
