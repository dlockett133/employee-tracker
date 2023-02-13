const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require('console.table');


const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'lupin1993',
    database: 'employee_db'
    },
    console.log("connected to the database")
);

// const menuPrompt = () => {
//     const startPrompt = [
//         {
//             type: `list`,
//             name: `action`,
//             message: `Would you like to:`,
//             choices: [
//                 `View all departments`,
//                 `View all roles`,
//                 `View all employees`,
//                 `Add a department`, 
//                 `Add a role`, 
//                 `Add an employee`,
//                 `Update an employee role`,
//                 `Quit`
//             ]
//         }
//     ]  
    
//     inquirer
//         .prompt(startPrompt)
//         .then((result) => {
//             // console.log(result.action)
//             switch (result.action) {
//                 case `View all departments`:
//                     viewDept();
//                     break;
//                 case `View all roles`:
//                     viewRoles();
//                     break;
//                 case `View all employees`:
//                     console.log(result.action)
//                     break;
//                 case `Add a department`:
//                     addDept();
//                     break;
//                 case `Add a role`:
//                     addRole();
//                     break;
//                 case `Add an employee`:
//                     console.log(result.action)
//                     break;
//                 case `Update an employee role`:
//                     console.log(result.action)
//                     break;
//                 case `Quit`:
//                     console.log(result.action)
//                     break;
            
//                 default:
//                     console.log("Invalid command")
//                     break;
//             }
//         })
// }    

const viewDept = () => {
    db.query(`SELECT id AS ID, name AS Department FROM department`, (err,results) => {
        err ? console.log(err) : console.table(results);
        menuPrompt();
    })
}

const viewRoles = () => {
    db.query(`
    SELECT role.title AS Title, role.id AS ID, department.name AS Department, role.salary AS Salary
    FROM role
    JOIN department
    ON role.department_id = department.id;`, 
    (err,results) => {err ? console.log(err) : console.table(results);
    menuPrompt();
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

    inquirer.prompt(addDepartmentPrompt)
        .then((data) => {
            db.query(
                `INSERT INTO department (name) 
                SELECT * FROM (SELECT ?) AS tmp 
                WHERE NOT EXISTS (
                    SELECT name FROM department WHERE LOWER(name) = LOWER(?)
                ) LIMIT 1;`,[data.deptName, data.deptName]
            )
            menuPrompt();
        })
        .catch(err => {console.log(err)});
}


const addRole = () => {
    const deptArrays = {
        id: [],
        name: []
    }

    const deptIdArray = deptArrays.id
    const deptnameArray = deptArrays.name

    db.query('SELECT * FROM department',(err,results) =>{
        results.forEach(result => {
            deptIdArray.push(result.id)
            deptnameArray.push(result.name)
        });
    })
    const addRolePrompt = [
        {
            type: `input`,
            name: `roleTitle`,
            message: `Name of the role?`
        },
        {
            type: `number`,
            name: `salary`,
            message: `Salary for the role?`
        },
        {
            type: `list`,
            name: `roleDept`,
            choices: deptnameArray
        }
    ]   

    inquirer.prompt(addRolePrompt)
        .then((data) => {
            let role = data.roleTitle;
            let salary = data.salary;

            let i = deptnameArray.indexOf(data.roleDept);
            let department_id = deptIdArray[i];

            db.query(
                `INSERT INTO role (title, salary, department_id) 
                SELECT * FROM (SELECT ?, ?, ?) AS tmp 
                WHERE NOT EXISTS (
                SELECT 1 FROM role 
                WHERE LOWER(title) = LOWER(?)
                ) LIMIT 1;`, [role, salary, department_id, role])
                menuPrompt();
        })
        .catch(err => {console.log(err)});

}

const addEmployee = () => {
    const roleArrays = {
        id:[],
        title:[]
    }
    
    const roleIdArray = roleArrays.id;
    const roleTitleArray = roleArrays.title;

    const managerArrays = {
        id:[],
        name:["None"]
    }

    const managerIdArray = managerArrays.id;
    const managerNameArray = managerArrays.name;

    db.query('SELECT id, title FROM role', (err,results) => {
        results.forEach(result => {
            roleIdArray.push(result.id);
            roleTitleArray.push(result.title);
        });
    })

    db.query('SELECT first_name, last_name, id FROM employee WHERE manager_id IS NULL', 
        (err,results) => {
            results.forEach(result => {
            managerIdArray.push(result.id)
            managerNameArray.push(result.first_name + " " + result.lastName)
        });
    })

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
            type: `list`,
            name: `employeeRole`,
            choices: roleTitleArray
        }, 
        {
            type: `list`,
            name: `employeeManager`,
            choices: managerNameArray
        }
    ]

    inquirer
    .prompt(addEmployeePrompt)
    .then((data) => {
        let firstName = data.firstName;
        let lastName = data.lastName;

        let i = roleTitleArray.indexOf(data.employeeRole);
        let roleId = roleIdArray[i]
        
        let x = managerNameArray.indexOf(data.employeeManager);
        let managerId = managerIdArray[i - 1]

        if (data.employeeManager === "None"){
            db.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                SELECT * FROM (SELECT ?, ?, ?, ?) AS tmp 
                WHERE NOT EXISTS (
                SELECT first_name, last_name, role_id, manager_id 
                FROM employee 
                WHERE first_name = ? 
                AND last_name = ? 
                AND role_id = ? 
                AND manager_id = ?
                ) LIMIT 1;
            `,[firstName, lastName, roleId, null, firstName, lastName, roleId, null]
            )    
        } else {
            db.query(
                `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
                SELECT * FROM (SELECT ?, ?, ?, ?) AS tmp 
                WHERE NOT EXISTS (
                SELECT first_name, last_name, role_id, manager_id 
                FROM employee 
                WHERE first_name = ? 
                AND last_name = ? 
                AND role_id = ? 
                AND manager_id = ?
                ) LIMIT 1;
                `,[firstName, lastName, roleId, managerId])
            }
    })
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

const menuPrompt = () => {
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
                    viewDept();
                    break;
                case `View all roles`:
                    viewRoles();
                    break;
                case `View all employees`:
                    console.log(result.action)
                    break;
                case `Add a department`:
                    addDept();
                    break;
                case `Add a role`:
                    addRole();
                    break;
                case `Add an employee`:
                    addEmployee();
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

module.exports = {
    menuPrompt,
    viewDept,
    addDept,
    addRole,
    addEmployee,
    updateEmployee
}