function init () {

  const Manager = require("./lib/Manager");
  const Engineer = require("./lib/Engineer");
  const Intern = require("./lib/Intern");
  const inquirer = require("inquirer");
  const path = require("path");
  const fs = require("fs");
  const teamArray = [];

  const OUTPUT_DIR = path.resolve(__dirname, "output");
  const outputPath = path.join(OUTPUT_DIR, "team.html");
  
  const render = require("./lib/htmlRenderer");
  // Write code to use inquirer to gather information about the development team members,
  // and to create objects for each team member (using the correct classes as blueprints!)
  
  managerQuestions();
  function managerQuestions() {
    inquirer
    .prompt([
        { 
        type: "input",
        message: "What is your manager's name?",
        name: "managerName",  
           },
        { 
        type: "input",
        message: "What is your manager's id?",
        name: "managerId",  
           },
        {
         type: "input",
         message: "What is your manager's email?",
         name: "managerEmail",
          },
       {
        type: "input",
        message: "What is your manager's office number?",
        name: "managerOffice",
          },
      ])
    .then(ans => {
      console.log(ans);
      const newManager = new Manager(ans.managerName, ans.managerId, ans.managerEmail, ans.managerOffice);
      teamArray.push(newManager);
      verifyNewEmp()});
   
      function verifyNewEmp() {
        inquirer
       .prompt ({
          type: "list",
          message: "What type of team member would you like to add?",
          choices: ["Engineer", "Intern", "Finished"],
          name: "employeeType",
        })
       
      .then(function selectNext(ans) {
        console.log(ans.employeeType);
        if (ans.employeeType === "Engineer") {
          engineerQuestions();
        }
        if (ans.employeeType === "Intern") {
          internQuestions();
        }
        if (ans.employeeType === "Finished") {
            console.log("Success!");
            console.log(teamArray);
            return fs.writeFileSync(outputPath, render(teamArray));      
        }
        
    function engineerQuestions() {
    inquirer
    .prompt([
      {
        type: "input",
        message: "What is your engineer's name?",
        name: "engineerName",
      },
      {
        type: "input",
        message: "What is your engineer's id?",
        name: "engineerId",
      },
      {
        type: "input",
        message: "What is your engineer's email?",
        name: "engineerEmail"
      },
      {
        type: "input",
        message: "What is your engineer's GitHub username?",
        name: "engineerGitHub"
      },
    ])
    .then(ans => {
      console.log(ans);
      const newEngineer = new Engineer(ans.engineerName, ans.engineerId, ans.engineerEmail, ans.engineerGitHug);
      teamArray.push(newEngineer);
      verifyNewEmp()
      });
    };
    
    function internQuestions() {
    inquirer
   .prompt([
      {
       type: "input",
        message: "What is your intern's name?",
        name: "internName",
      },
      {
        type: "input",
        message: "What is your intern's id?",
        name: "internId",
      },
      {
        type: "input",
        message: "What is your intern's email?",
        name: "internEmail"
      },
      {
        type: "input",
        message: "What is your intern's school?",
        name: "internSchool"
      },
      ])
    .then(ans => {
      console.log(ans);
      const newIntern = new Intern(ans.internName, ans.internId, ans.internEmail, ans.internSchool);
      teamArray.push(newIntern);
      verifyNewEmp()
        })
      };
    });
  }
}
}
init();

