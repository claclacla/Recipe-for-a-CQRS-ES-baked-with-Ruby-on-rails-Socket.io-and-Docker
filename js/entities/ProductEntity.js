const IEntity = require("./IEntity");

class Product extends IEntity {
  constructor({ uid, name, price }) {
    super({ uid });

    if (name === undefined) {
      throw new Error("name is a required parameter");
    }

    if(price === undefined) {
      price = 0;
    }

    this.name = name;
    this.price = price;
  }
}

module.exports = Product