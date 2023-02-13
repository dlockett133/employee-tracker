const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require('console.table');
const question = require('./utils/employeeQuestions')


const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'lupin1993',
    database: 'employee_db'
    },
    console.log("connected to the database")
);

db.query(`SELECT * FROM department`, (err,results) => {
    console.table(results)
})