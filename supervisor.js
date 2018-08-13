//requireing both mysql and inquirer from npm
var mysql = require('mysql');
var inquirer = require("inquirer");
var cTable = require("console.table");


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
    console.log("connected as id " + connection.threadId);
    //input code to execute
    supervisor();
});



function supervisor() {
    inquirer.prompt([{
        name: "question",
        type: "list",
        message: "Which would you like to do?",
        choices: ["View Product Sales by Department", "Add a New Department", "Exit"]
    }]).then(function(answers) {
        switch (answers.question) {
            case "View Product Sales by Department":
                connection.query("SELECT departments.department_id, products.department_name, departments.over_head_costs AS over_head_costs, SUM(products.product_sales) AS product_sales, product_sales - over_head_costs AS total_profit FROM departments LEFT JOIN products ON departments.department_name = products.department_name GROUP BY department_name", function(err, response) {
                    if (err) throw err;
                    console.table(response);
                    supervisor();
                })
                break;

            case "Add a New Department":
                addNewDepartment();
                break;

            case "Exit":
                connection.end();
        };
    });
};

function addNewDepartment() {
    inquirer.prompt([{
        name: "department",
        type: "input",
        message: "What is the new department name?"
    }, {
        name: "overhead",
        type: "input",
        message: "What is the over head for this new department?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function(answers) {
        var department = answers.department;
        var overhead = Number(answers.overhead);
        connection.query("INSERT INTO bamazon.departments (department_name, over_head_costs) VALUES (?, ?)", [department, overhead], function(err) {
            if (err) throw err;
            console.log("Your new department was added!");
            supervisor();
        });
    });
};