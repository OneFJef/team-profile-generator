const emailValidator = require("email-validator");

const Employee = require("./employee");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }
  getGithub() {
    return this.github;
  }

  getRole() {
    return "Engineer";
  }

  getQuestions() {
    return questions;
  }
}

const questions = [
  {
    name: "name",
    message: "What is the engineer's name?",
  },
  {
    name: "id",
    message: "What is the engineer's id?",
  },
  {
    name: "email",
    message: "What is the engineer's email?",
    validate(input) {
      if (emailValidator.validate(input)) {
        return true;
      } else {
        return "Please enter a valid email address.";
      }
    },
  },
  {
    name: "github",
    message: "What is the engineer's github?",
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

module.exports = Engineer;
