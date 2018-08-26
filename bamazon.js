// Dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');

// Set up MySQL connection parameters
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	// Username
	user: 'root',

	// Password
    password: 'root',

    // Referenced database
	database: 'bamazon'
});

// Function promptUserPurchase will prompt the user for the item/quantity they would like to buy
function promptUserPurchase() {
	

	// Prompt the user to select the product
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter an ID of the product you would like to purchase.',
			validate: validateInput,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many units of the product you would like to purchase?',
			validate: validateInput,
			filter: Number
		}
	]).then(function(input) {
		var item = input.item_id;
		var quantity = input.quantity;

		// Check existing databass to confirm that selected item id exists in the quantity selected
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;

			// Dipslay an empty data array, if the user's input is invalid
			if (data.length === 0) {
				console.log('ERROR: Invalid Product ID. Please select a valid Product ID.');
				displayInventory();

			} else {
				var productData = data[0];

			// Display if the quantity requested is in stock
				if (quantity <= productData.stock_quantity) {
					console.log('Congratulations, the product you have requested is in stock! Placing an order!');

					// Update query string
					var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
					
                    // Update the current inventory
					connection.query(updateQueryStr, function(err, data) {
						if (err) throw err;

						console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
						console.log('Thank you for shopping with us!');
						console.log("\n---------------------------------------------------------------------\n");

						// Ends database connection
						connection.end();
					})
				} else {
					console.log('We are sorry, but there is not enough product in stock to complete your order. Your order can not be placed at this time.');
					console.log('Please modify your order, or make another selection.');
					console.log("\n---------------------------------------------------------------------\n");

					displayInventory();
				}
			}
		})
	})
}

// Function displayInventory will retrieve the current inventory from the database and output it to the console
function displayInventory() {
    
    // Set up the database query string
	queryStr = 'SELECT * FROM products';

	// Make the database query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('\n...................\n');

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  //  ';
			strOut += 'Product Name: ' + data[i].product_name + '  //  ';
			strOut += 'Department: ' + data[i].department_name + '  //  ';
			strOut += 'Price: $' + data[i].price + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	// Prompt the user for the product quantity they would like to purchase
	  	promptUserPurchase();
	})
}

// Function runBamazon executes application's logic
function runBamazon() {
	
// Display the available inventory
	displayInventory();
}

// Run the application logic
runBamazon();