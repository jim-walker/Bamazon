// Set up Dependencies
const db = require('./models');
const inquirer = require('inquirer');

// Sync with Bamazon DB on products that are in stock
db.sequelize.sync().then(function(){
  db.products.findAll({
    where: 
      {stock_quantity:
        {gt: 0}
      }
  }).then(function(data){
    // On sync success List items for sale
    console.log('--------------ITEMS FOR SALE-----------------');
    console.log(`ITEM#\t\tNAME\t\t\tPRICE`);
    // console.log(JSON.stringify(data, null, 2));
    for(i=0;i<data.length;i++){
      console.log(`${data[i].item_id}\t\t${data[i].product_name}\t\t\$${data[i].price}`);
    };
    // Prompt User for Item and Quantity
    inquirer.prompt([
      {
        type: 'input',
        name: 'item_id',
        message: 'Enter the ITEM# to purchase.',
        filter: Number
      },
      {
        type: 'input',
        name: 'quantity',
        message: 'How many such items do you require?',
        filter: Number
      }
    ]).then(function (input) {
      // On prompt success get Index of Item in data Array
      var itemIndex=data.map(function(e) { return e.item_id; }).indexOf(input.item_id);
      // Evaluate if in stock quantity is sufficient for order
      if (input.quantity<=data[itemIndex].stock_quantity){
        // If stock is sufficient message total cost to User
        cost=data[itemIndex].price*input.quantity;
        console.log(`Total cost of purchasing ${input.quantity} ${data[itemIndex].product_name}s is \$${cost.toFixed(2)
        }`);
        // Subtract order from quantity in data array
        data[itemIndex].stock_quantity=data[itemIndex].stock_quantity-input.quantity;
        // Update database with new quantity
        db.products.update({
          stock_quantity: data[itemIndex].stock_quantity
        },{
          where: { item_id: data[itemIndex].item_id }
        }).then(function(response) {
          console.log(`Success! Transaction complete`);
        }).catch(function(error) {
          console.log('Error', error);
        });
      } else {
        // If stock is not sufficient inform the user of their incredible bad fortune
        console.log(`Sorry! Fresh Out of ${data[itemIndex].product_name}`);
      }
    });
  });
});