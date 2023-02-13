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
