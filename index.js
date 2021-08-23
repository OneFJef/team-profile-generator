const fs = require("fs");
const inquirer = require("inquirer");
const emailValidator = require("email-validator");

inquirer
  .prompt([
    {
      name: "name",
      message: `What is the ${role}'s name?`,
    },
    {
      name: "id",
      message: `What is the ${role}'s id?`,
    },
    {
      name: "email",
      message: `What is the ${role}'s email?`,
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
      message: `What is the ${role}'s office number?`,
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
  ])
  .then((answers) => {
    console.log(answers);
  });
