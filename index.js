const fs = require("fs");
const inquirer = require("inquirer");
const emailValidator = require("email-validator");

// Import classes.
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

// Sets start point for inquirer logic.
let role = "Manager";
// Stores all of the answers to be pushed to HTML.
let teamArray = [];

// Questions just for the unique classes.
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

// Navigation question to be appended to the end of the logic.
let addRole = {
  type: "list",
  name: "addRole",
  message: "Which team member would you like to add?",
  choices: ["Engineer", "Intern", "I don't want to add anymore team members."],
};

// Generic questions for every team member.
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

// Checks the current role, fires off questions for that role, creates object with answers given,
// changes the role based on your "addRole andswer", stores the answers in "teamArray", and either starts from the top or builds the HTML.
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
        createTeam();
      });
      break;
    case "I don't want to add anymore team members.":
      buildHTML();
      break;
  }
}

// Builds an HTML card to be added to the HTML later.
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

// Reads the source HTML, applies all the collected answers, writes the new index.html to ./dist, and copies the style.css to ./dist.
function buildHTML() {
  fs.readFile("./src/index.html", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      let cleanTeam = teamArray.toString().replace(/,/g, "");
      let result = data.toString().replace("<img>", cleanTeam);
      fs.writeFile("./dist/index.html", result, "utf8", function (err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Your Team has been generated.")
        }
      });
      fs.copyFile('./src/style.css', './dist/style.css', (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  });
}

// Function to start the machine!
function init() {
  createTeam();
}

init();
