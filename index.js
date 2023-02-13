const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require('console.table');
const prompt = require('./utils/prompt')


const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'lupin1993',
    database: 'employee_db'
    },
    console.log("connected to the database")
);

// db.query(`SELECT * FROM department`, (err,results) => {
//     console.table(results)
// })

// db.promise().query('SELECT * FROM department')
//   .then((results) => {
//     console.log(results);
//   })

// inquirer
//     .prompt(question.startQuestion)
//     .then((result)=>{console.log(result)});

prompt.menuPrompt();