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

### The Product Table
![products table](/images/product_table.JPG)
