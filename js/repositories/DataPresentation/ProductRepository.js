const productModelFactory = require("./modelFactories/productModelFactory");
const DataPresentationProductEntity = require("../../entities/DataPresentation/ProductEntity");
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

  async add(dataPresentationProductEntity) {
    if(dataPresentationProductEntity instanceof DataPresentationProductEntity === false) {
      throw new Error("The parameter is not an instance of DataPresentationProductEntity");
    }

    let MongooseProduct = productModelFactory({ connection: this.connection });

    const mongooseProduct = new MongooseProduct({
      uid: dataPresentationProductEntity.uid,
      name: dataPresentationProductEntity.name,
      price: dataPresentationProductEntity.price
    });

    try {     
      const resMongooseProduct = await mongooseProduct.save();

      const resDataPresentationProductEntity = new DataPresentationProductEntity({
        uid: resMongooseProduct.uid,
        name: resMongooseProduct.name,
        price: resMongooseProduct.price
      });

      return resDataPresentationProductEntity;
    } catch (err) {
      throw new DatabaseError("DataPresentationProductEntity has NOT been saved");
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