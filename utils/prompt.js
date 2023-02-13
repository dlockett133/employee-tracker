const inquirer = require("inquirer")

const menu = () => {
    const startPrompt = [
        {
            type: `list`,
            name: `action`,
            message: `Would you like to:`,
            choices: [
                `View all departments`,
                `View all roles`,
                `View all employees`,
                `Add a department`, 
                `Add a role`, 
                `Add an employee`,
                `Update an employee role`,
                `Quit`
            ]
        }
    ]  
    
    inquirer
        .prompt(startPrompt)
        .then((result) => {
            // console.log(result.action)
            switch (result.action) {
                case `View all departments`:
                    console.log(result.action)
                    break;
                case `View all roles`:
                    console.log(result.action)
                    break;
                case `View all employees`:
                    console.log(result.action)
                    break;
                case `Add a department`:
                    console.log(result.action)
                    break;
                case `Add a role`:
                    console.log(result.action)
                    break;
                case `Add an employee`:
                    console.log(result.action)
                    break;
                case `Update an employee role`:
                    console.log(result.action)
                    break;
                case `Quit`:
                    console.log(result.action)
                    break;
            
                default:
                    console.log("Invalid command")
                    break;
            }
        })
}    

const addDept = () => {
    const addDepartmentPrompt = [
        {
            type: `input`,
            name: `deptName`,
            message: `Name of the department?`
        }
    ]
}


const addRole = () => {
    const addRolePrompt = [
        {
            type: `input`,
            name: `roleName`,
            message: `Name of the role?`
        },
        {
            type: `number`,
            name: `salary`,
            message: `Salary for the role?`
        },
        {
            type: `input`,
            name: `roleDept`,
            message: `Department for the role?`
        }
    ]   
}

const addEmployee = () => {
    const addEmployeePrompt = [
        {
            type: `input`,
            name: `firstName`,
            message: `First name?`
        },
        {
            type: `input`,
            name: `lastName`,
            message: `Last name?`
        },
        {
            type: `input`,
            name: `employeeRole`,
            message: `Employee's role?`
        }, 
        {
            type: `input`,
            name: `employeeManager`,
            message: `Employee's manager?`
        }
    ]
}

const updateEmployee = () => {
    const updateEmployeePrompt = [
        {
            type: `list`,
            name: `employee`,
            choices: []
        },
        {
            type: `input`,
            name: `newRole`,
            message: `Employee's role?`
        }
    ]
}


module.exports = {
    menu,
    addDept,
    addRole,
    addEmployee,
    updateEmployee
}