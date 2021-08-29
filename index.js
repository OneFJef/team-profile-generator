const fs = require("fs");
const inquirer = require("inquirer");
const emailValidator = require("email-validator");

const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

let role = "Manager";
let teamArray = [];

let questionsRole = [
  {
    name: "officeNumber",
    message: `What is the Manager's office number?`,
  },
  {
    name: "github",
    message: "What is the Engineer's github?",
  },
  {
    name: "school",
    message: "What school does the Intern attend?",
  },
];

let addRole = {
  type: "list",
  name: "addRole",
  message: "Which team member would you like to add?",
  choices: ["Engineer", "Intern", "I don't want to add anymore team members."],
};

function questionsBase(e) {
  return (questions = [
    {
      name: "name",
      message: `What is the ${e}'s name?`,
    },
    {
      name: "id",
      message: `What is the ${e}'s id?`,
    },
    {
      name: "email",
      message: `What is the ${e}'s email?`,
      validate(input) {
        if (emailValidator.validate(input)) {
          return true;
        } else {
          return "Please enter a valid email address.";
        }
      },
    },
  ]);
}

function createTeam() {
  let updatedQuestions = [];
  switch (role) {
    case "Manager":
      managerQuestions = questionsBase(role);
      updatedQuestions = [...managerQuestions, questionsRole[0], addRole];
      inquirer.prompt(updatedQuestions).then((answers) => {
        let manager = new Manager(
          answers.name,
          answers.id,
          answers.email,
          answers.officeNumber
        );
        role = answers.addRole;
        teamArray.push(buildCard(manager));
        console.log({ teamArray });
        createTeam();
      });
      break;
    case "Engineer":
      engineerQuestions = questionsBase(role);
      updatedQuestions = [...engineerQuestions, questionsRole[1], addRole];
      inquirer.prompt(updatedQuestions).then((answers) => {
        let engineer = new Engineer(
          answers.name,
          answers.id,
          answers.email,
          answers.github
        );
        role = answers.addRole;
        teamArray.push(buildCard(engineer));
        console.log({ teamArray });
        createTeam();
      });
      break;
    case "Intern":
      internQuestions = questionsBase(role);
      updatedQuestions = [...internQuestions, questionsRole[2], addRole];
      inquirer.prompt(updatedQuestions).then((answers) => {
        let intern = new Intern(
          answers.name,
          answers.id,
          answers.email,
          answers.school
        );
        role = answers.addRole;
        teamArray.push(buildCard(intern));
        console.log({ teamArray });
        createTeam();
      });
      break;
    case "I don't want to add anymore team members.":
      buildHTML();
      break;
  }
}

function buildCard(a) {
  let roleTitle = "";
  let roleSpecialIcon = "";
  let roleSpecialTitle = "";
  let roleSpecial = "";

  if (a instanceof Manager) {
    roleTitle = a.getRole();
    roleSpecialIcon = "fas fa-mug-hot";
    roleSpecialTitle = "Office Number: ";
    roleSpecial = a.getOfficeNumber();
  } else if (a instanceof Engineer) {
    roleTitle = a.getRole();
    roleSpecialIcon = "fas fa-glasses";
    roleSpecialTitle = "GitHub: ";
    let github = a.getGithub();
    roleSpecial = `<a href="https://github.com/${github}">${github}</a>`
  } else if (a instanceof Intern) {
    roleTitle = a.getRole();
    roleSpecialIcon = "fas fa-user-graduate";
    roleSpecialTitle = "School: ";
    roleSpecial = a.getSchool();
  } else {
    return;
  }

  let card = `
      <div class="card">
        <div class="card-header">
          <h4 class="eName">${a.name}</h4>
          <h4 class="eRole"><i class="${roleSpecialIcon}"></i> ${roleTitle}</h4>
        </div>
        <ul class="list-group">
          <li class="list-group-item eId">ID: ${a.id}</li>
          <li class="list-group-item eEmail">Email: <a href="mailto:${a.email}">${a.email}</a></li>
          <li class="list-group-item eUnique">${roleSpecialTitle}${roleSpecial}</li>
        </ul>
      </div>`;

  return card;
}

function buildHTML() {
  fs.readFile("./src/index.html", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let cleanTeam = teamArray.toString().replaceAll(",", "");
      let result = data.toString().replace("<img>", cleanTeam);
      fs.writeFile("./dist/index.html", result, "utf8", function (err) {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}

function init() {
  createTeam();
}

init();
