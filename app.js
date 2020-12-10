function init () {

  const Manager = require("./lib/Manager");
  const Engineer = require("./lib/Engineer");
  const Intern = require("./lib/Intern");
  const inquirer = require("inquirer");
  const path = require("path");
  const fs = require("fs");
  
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
    .then(() => {
      verifyNewEmp()});
    
      function verifyNewEmp() {
        inquirer
       .prompt ({
          type: "checkbox",
          message: "What type of team member would you like to add?",
          choices: ["Engineer", "Intern", "Manager", "I don't want to add anymore team members."],
          name: "employeeType",
      },)
  
      .then(
        switch("employeeType") {
         case Engineer:
           nextEmp = engineerQuestions();
           break;
         case Intern:
           nextEmp = internQuestions();
           break;
           case Manager:
           nextEmp = managerQuestions();
           break;
           default:
           nextEmp = inquirer.then((response) => {
           return fs.writeFileSync(outputPath, render(response));
               });
            }
         }) 
       }
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
    .then((response) => {
    verifyNewEmp();
    });
  }
    
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
    .then((response) => {
    verifyNewEmp();
    }); 
}

init();

  // After the user has input all employees desired, call the `render` function (required
  // above) and pass in an array containing all employee objects; the `render` function will
  // generate and return a block of HTML including templated divs for each employee!
  
  // After you have your html, you're now ready to create an HTML file using the HTML
  // returned from the `render` function. Now write it to a file named `team.html` in the
  // `output` folder. You can use the variable `outputPath` above target this location.
  // Hint: you may need to check if the `output` folder exists and create it if it
  // does not.
  
  // HINT: each employee type (manager, engineer, or intern) has slightly different
  // information; write your code to ask different questions via inquirer depending on
  // employee type.
  
  // HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
  // and Intern classes should all extend from a class named Employee; see the directions
  // for further information. Be sure to test out each class and verify it generates an
  // object with the correct structure and methods. This structure will be crucial in order
  // for the provided `render` function to work! 