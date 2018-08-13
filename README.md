# bamazon

## Overview

Bamazon is a node.js application that demonstrates database queires, updates, additions, and subtractions. The application utilizes three different roles.
* Customer
* Manager
* Supervisor

The Customer is able to search the inventory of Bamazon and purchase items. Then Manager has the roles to display the current inventory, update inventory, or add a new product. Finally, the Supervisor can display the total profit or profit loss by department or they can add a new department to the database. 

A MySQL database is used to retain the data on the inventory. Node.js is used to send queries to the database and recieve responses from the database. 

## The Database

The Bamazom database maintained two tables.

### The Products Table
![products table](/images/product_table.JPG)

### The Departments Table
![Departments Table](/images/department_table.JPG)

The two tables can be joined for the supervisor so that they can see profit/loss by each department

### Supervisor View By Join of Products and Departments Tables
![Supervisor View](/images/supervisor_table.JPG)

## The Terminal Commands and Outputs

Since this is a node.js application everything is done and viewed in the terminal. You start the application by either choosing bamazonCustomer.js or supervisor.js.

### bamazonCustomer.js
Once you start the bamazonCustomer.js the user is greated with a list of roles to choose from.

![Roles](/images/roles.JPG)

If you choose the Customer role then you are presented with a list of products you can purchase.

![List of Products](/images/customer_productlist.JPG)

Once you have selected the item you can purchase it.

![Purchase](/images/customer_purchase.JPG)

If you end up trying to purchase more than what is currently available then you will recieve a message that you cannot purchase that many items.

![Low Inventory](/images/customer_lowinventory.JPG)


If you chose the Manager role then you are presented with a different list of options.

![Manager Options](/images/manager_options.JPG)

The Manager can choose to see the entire inventory.

![Entire Inventory](/images/manager_table_all_products.JPG)

The Manager can also see the low inventory items (less than 4 in stock was considered low inventory).

![Low Inventory](/images/manager_lowinv.JPG)

The Manager can choose to add inventory to select items.

![Add Inventory](/images/manager_updateInv.JPG)

The Manager can also add a new item to be purchased.

![New Item](/images/manager_addItem.JPG)

The new updated inventory.

![Updated Table](/images/manager_updatedTable.JPG)


### supervisor.js

If you chose the Supervisor role you are presented with two options.

![Supervisor Options](/images/supervisor_options.JPG)

The supervisor can see how well the departments are doing as a whole. 

![Department View](/images/supervisor_tableView.JPG)

The supervisor can also add a new department.

![New Department](/images/supervisor_newDepartment.JPG)

Once the manager adds an item to the new department and a customer purchases the new item then the supervisor's department table is updated with new stats.

![New Department View](/images/supervisor_updatedTable.JPG)