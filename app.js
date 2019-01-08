const db = require('./models');
const inquirer = require('inquirer');

db.sequelize.sync().then(function(){
  db.products.findAll({
    where: 
      {stock_quantity:
        {gt: 0}
      }
  }).then(function(data){
    console.log('--------------ITEMS FOR SALE-----------------');
    console.log(`ITEM#\t\tNAME\t\t\tPRICE`);
    // console.log(JSON.stringify(data, null, 2));
    for(i=0;i<data.length;i++){
      console.log(`${data[i].item_id}\t\t${data[i].product_name}\t\t\$${data[i].price}`);
    };

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
      var itemIndex=data.map(function(e) { return e.item_id; }).indexOf(input.item_id);
      if (input.quantity<=data[itemIndex].stock_quantity){
        cost=data[itemIndex].price*input.quantity;
        console.log(`Total cost of purchasing ${input.quantity} ${data[itemIndex].product_name}s is \$${cost}`);
        data[itemIndex].stock_quantity=data[itemIndex].stock_quantity-input.quantity;
        // console.log(`New quantity is ${data[itemIndex].stock_quantity}`);
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
        console.log(`Sorry! Fresh Out of ${data[itemIndex].product_name}`);
      }
    });
  });
});