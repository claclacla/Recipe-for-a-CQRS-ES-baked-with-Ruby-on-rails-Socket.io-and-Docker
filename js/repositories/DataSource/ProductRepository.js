const productModelFactory = require("./modelFactories/productModelFactory");
const DataSourceProductEntity = require("../../entities/DataSourceProductEntity");
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

  async add(dataSourceProductEntity) {
    if(dataSourceProductEntity instanceof DataSourceProductEntity === false) {
      throw new Error("The parameter is not an instance of DataSourceProductEntity");
    }

    let MongooseProduct = productModelFactory({ connection: this.connection });

    const mongooseProduct = new MongooseProduct({
      uid: dataSourceProductEntity.uid,
      name: dataSourceProductEntity.name,
      price: dataSourceProductEntity.price
    });

    try {     
      const resMongooseProduct = await mongooseProduct.save();

      const resDataSourceProductEntity = new DataSourceProductEntity({
        uid: resMongooseProduct.uid,
        name: resMongooseProduct.name,
        price: resMongooseProduct.price
      });

      return resDataSourceProductEntity;
    } catch (err) {            
      throw new DatabaseError("DataSourceProductEntity has NOT been saved");
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