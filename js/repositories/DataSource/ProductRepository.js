const productModelFactory = require("./modelFactories/productModelFactory");
const ProductEntity = require("../../entities/ProductEntity");
const IRepository = require("../IRepository");
const UID = require("../../lib/UID/UID");

const DatabaseError = require('../../errors/application/DatabaseError');

class ProductRepository extends IRepository {
  constructor({ connection }) {
    if(connection === undefined) {
      throw new Error("connection is a required parameter");
    }

    super();

    this.connection = connection;
  }

  async add(productEntity) {
    if(productEntity instanceof ProductEntity === false) {
      throw new Error("The parameter is not an instance of ProductEntity");
    }

    let MongooseProduct = productModelFactory({ connection: this.connection });

    const mongooseProduct = new MongooseProduct({
      uid: productEntity.uid,
      name: productEntity.name,
      price: productEntity.price
    });

    try {     
      const resMongooseProduct = await mongooseProduct.save();

      const resProductEntity = new ProductEntity({
        uid: resMongooseProduct.uid,
        name: resMongooseProduct.name,
        price: resMongooseProduct.price
      });

      return resProductEntity;
    } catch (err) {            
      throw new DatabaseError("ProductEntity has NOT been saved");
    }    
  }

  update(query, product) {

  }

  async getByUid(uid) {

  }

  get(match, filters) {

  }

  remove(filter) {

  }
}

module.exports = ProductRepository