const startQuestion = [
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
            `Update an employee role`
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