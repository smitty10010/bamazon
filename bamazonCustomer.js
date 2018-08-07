//requireing both mysql and inquirer from npm
var mysql = require('mysql');
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "1qaz2wsx",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    //input code to execute
});