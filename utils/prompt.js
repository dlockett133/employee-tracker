const startPrompt = [
    {
        type: `list`,
        name: `queryStart`,
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

const addDepartment = [
    {
        type: `input`,
        name: `deptName`,
        message: `Name of the department?`
    }
]

const addRole = [
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

const addEmployee = [
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
const updateEmployee = [
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

module.exports = {
    startQuestion: startQuestion,
    addDepartment: addDepartment,
    addRole: addRole,
    addEmployee: addEmployee,
    updateEmployee: updateEmployee
}