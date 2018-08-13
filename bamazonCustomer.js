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
    role();
});


function showAllItemsForSale() {
    connection.query("SELECT * FROM bamazon.products", function(err, res) {
        if (err) throw err;
        console.table(res);
        manager();
    });
};

function role() {
    inquirer.prompt({
        name: "role",
        type: "list",
        message: "What is your role?",
        choices: ["Customer", "Manager", "Quit"]
    }).then(function(answer) {
        switch (answer.role.toLowerCase()) {
            case "customer":
                customer();
                break;

            case "manager":
                manager();
                break;

            case "quit":
                quit();
        };
    });
};

function customer() {
    connection.query("SELECT * FROM bamazon.products", function(err, results) {
        if (err) throw err;

        inquirer.prompt([{
                name: "products",
                type: "list",
                message: "Please select the ID of the product you would like to purchase:",
                choices: function() {
                    var choiceArray = [];
                    for (i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                }
            },
            {
                name: "amount",
                type: "input",
                message: "Please select the amount you would like to purchase:",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(answer) {
            var chosenItem;
            for (i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.products) {
                    chosenItem = results[i];
                }
            };
            if (chosenItem.stock_quantity >= Number(answer.amount)) {
                var totalPrice = chosenItem.price * Number(answer.amount);
                var newQuantity = chosenItem.stock_quantity - Number(answer.amount);
                console.log("Your total price is " + totalPrice);
                connection.query("UPDATE bamazon.products SET ?, ? WHERE ?", [{
                    stock_quantity: newQuantity
                }, {
                    product_sales: totalPrice
                }, {
                    id: chosenItem.id
                }], function(err) {
                    if (err) throw err;
                    console.log("Thank you for your purchase. Now we have " + newQuantity + " of " + chosenItem.product_name + " in stock.")
                    role();
                });

            } else {
                console.log("I'm sorry we only have " + chosenItem.stock_quantity + " of " + chosenItem.product_name + " in stock, please choose another amount.")
                customer();
            }
        })
    })
};

function manager() {
    inquirer.prompt({
        name: "options",
        type: "list",
        message: "Hello bamazon manager, please select from the below options.",
        choices: ["Show all products", "View low inventory", "Add to Inventory", "Add new product", "exit"]
    }).then(function(answer) {
        switch (answer.options.toLowerCase()) {
            case "show all products":
                showAllItemsForSale();
                break;

            case "view low inventory":
                viewLowInventory();
                break;

            case "add to inventory":
                addToInventory();
                break;

            case "add new product":
                addNewProduct();
                break;

            case "exit":

                role();
        }
    })
};

function viewLowInventory() {
    connection.query("SELECT * FROM bamazon.products WHERE stock_quantity < 4", function(err, res) {
        if (err) throw err;
        console.table(res);
        manager();
    });
};

function addToInventory() {
    connection.query("SELECT * FROM bamazon.products", function(err, results) {
        if (err) throw err;
        inquirer.prompt([{
                name: "product",
                type: "list",
                message: "Please select the product you would like to update: ",
                choices: function() {
                    var choiceArray = [];
                    for (i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                }
            },
            {
                name: "amount",
                type: "input",
                message: "Please input the amount you are adding to the inventory:",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ]).then(function(answer) {
            var chosenItem;
            for (i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.product) {
                    chosenItem = results[i];
                }
            };
            var newInventory = chosenItem.stock_quantity + Number(answer.amount);
            connection.query("UPDATE bamazon.products SET ? WHERE ?", [{ stock_quantity: newInventory }, { product_name: answer.product }], function(err, res) {
                if (err) throw err;
                console.log("The inventory for " + answer.product + " has been updated.");
                manager();
            })
        });
    });
};

function addNewProduct() {
    inquirer.prompt([{
        name: "productName",
        type: "input",
        message: "What is the name of the product you would like to add?"
    }, {
        name: "department",
        type: "input",
        message: "What department does this new product belong in?"
    }, {
        name: "price",
        type: "input",
        message: "What is the price for this new product?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }, {
        name: "quantity",
        type: "input",
        message: "What is the quantity of this new product?",
        validate: function(value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }]).then(function(answer) {
        var product_name = answer.productName;
        var department_name = answer.department;
        var price = Number(answer.price);
        var stock_quantity = Number(answer.quantity);
        connection.query("INSERT INTO bamazon.products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)", [product_name, department_name, price, stock_quantity], function(err, results, fields) {
            if (err) throw err;
            console.log("Your new item was added.");
            manager();
        })

    })
};


function quit() {
    connection.end();
};