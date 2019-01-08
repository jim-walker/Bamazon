module.exports = function(connection, Sequelize) {
  const Products = connection.define('products', {
    item_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
      },
    product_name: Sequelize.STRING,
    price: Sequelize.DECIMAL,
    stock_quantity: Sequelize.INTEGER},
    {
      timestamps :false
  });

  return Products;
}
