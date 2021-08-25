const fs = require("fs");
const inquirer = require("inquirer");

const Manager = require("./lib/manager");

let questions = [];

const manager = new Manager();

function init() {
  inquirer.prompt(manager.getRole(questions)).then((answers) => {
    console.log({ manager });
    console.log({ answers });
  });
};

init()