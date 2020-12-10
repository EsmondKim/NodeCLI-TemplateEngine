// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
const { role } = require("./Manager");

class Engineer extends Employee {
constructor(name, id, email, gitHubuser)

    {
    super(name, id, email);
    this.gitHubUser = gitHubuser;
    }

    getRole() {
        return "Engineer"
    }

    getGithub() {
        return this.gitHubuser
    }
    
}

module.exports = Engineer