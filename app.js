const db = require('./models');

db.sequelize.sync().then(function(){
  db.Products.findAll({
    where: {
      product_name: 'TomFoolery'
    }
  }).then(function(data){
    console.log('------------PRINTING DB DATA-----------------');
    console.log(JSON.stringify(data, null, 2));
  });

  // db.Reservation.findAll({
  //   where: {
  //     phoneNumber: '444-666-3377'
  //   }
  // }).then(function(data){
  //   console.log('------------PRINTING DB DATA-----------------');
  //   console.log(JSON.stringify(data, null, 2));
  // });

  // db.Reservation.find({
  //   where: {
  //     phoneNumber: '444-666-3377'
  //   }
  // }).then(function(data){
  //   console.log('------------PRINTING DB DATA-----------------');
  //   console.log(JSON.stringify(data, null, 2));
  // });


});
