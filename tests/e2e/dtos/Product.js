class Product {
  constructor({ name, price }) {
    if (name === undefined) {
      throw new Error("The name parameter is required");
    }

    if (price === undefined) {
      throw new Error("The price parameter is required");
    }

    this.name = name;
    this.price = price;
  }
}

module.exports = Product;