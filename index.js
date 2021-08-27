const fs = require("fs");
const inquirer = require("inquirer");

const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

const manager = new Manager();
const engineer = new Engineer();
const intern = new Intern();

let employee = "Manager";
let team = [];
let questions = [];

function init() {
  switch (employee) {
    case "Manager":
      employeeQuestions = manager.getQuestions(questions);
      employeeRole = manager.getRole();
      break;
    case "Engineer":
      employeeQuestions = engineer.getQuestions(questions);
      employeeRole = engineer.getRole();
      break;
    case "Intern":
      employeeQuestions = intern.getQuestions(questions);
      employeeRole = intern.getRole();
      break;
    default:
      break;
  }

  inquirer
    .prompt(employeeQuestions)
    .then((answers) => {
      // console.log({ answers });
      delete answers["addRole"];
      // console.log({ answers });
      let answersWithRole = { ...answers, employeeRole };
      return answersWithRole;
    })
    .then((answersWithRole) => {
      // console.log({ team });
      team.push(answersWithRole);
      // console.log({ team });
      switch (answersWithRole.addRole) {
        case "Engineer":
          employee = "Engineer";
          init();
          break;
        case "Intern":
          employee = "Intern";
          init();
          break;
        case "I don't want to add anymore team members.":
          buildHTML();
          break;
      }
    });
}

function buildHTML() {
  ``
}

init();
