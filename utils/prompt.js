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
    const deptArray = {
        id: [],
        name: []
    }

    const deptIdArray = deptArray.id
    const deptnameArray = deptArray.name

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

            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, [role, salary, department_id])
        })

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

module.exports = {
    menuPrompt,
    viewDept,
    addDept,
    addRole,
    addEmployee,
    updateEmployee
}