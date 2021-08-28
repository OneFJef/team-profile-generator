const fs = require("fs");
const inquirer = require("inquirer");

const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const Manager = require("./lib/manager");

const manager = new Manager();
const engineer = new Engineer();
const intern = new Intern();

let questions = [];
let employee = "Manager";
let team = [];

let managerArray = [];
let engineerArray = [];
let internArray = [];

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
      let employeeWithRole = { ...answers, employeeRole };
      return employeeWithRole;
    })
    .then((employeeWithRole) => {
      switch (employeeWithRole.addRole) {
        case "Engineer":
          storeAnswers(employeeWithRole);
          employee = "Engineer";
          init();
          break;
        case "Intern":
          storeAnswers(employeeWithRole);
          employee = "Intern";
          init();
          break;
        case "I don't want to add anymore team members.":
          // buildHTML();
          storeAnswers(employeeWithRole);
          break;
      }
    });
}

function storeAnswers(e) {
  switch (employee) {
    case "Manager":
      console.log({ employee });
      managerArray.push(e);
      console.log({ managerArray });
      break;
    case "Engineer":
      console.log({ employee });
      engineerArray.push(e);
      console.log({ engineerArray });
      break;
    case "Intern":
      console.log({ employee });
      internArray.push(e);
      console.log({ internArray });
      break;
    default:
      break;
  }
}

function buildHTML() {
  fs.readFile("./src/index.html", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
}

init();
