const Product = require('../dtos/Product');

class ProductFactory {
  static create({ name, price }) {
    let product = new Product({ name, price });

    return product;
  }
}

module.exports = ProductFactory;