module.exports = function(connection, Sequelize) {
  const Products = connection.define('products', {
    product_name: Sequelize.STRING,
    price: Sequelize.DECIMAL,
    stock_quantity: Sequelize.INTEGER
  });

  return Products;
}
