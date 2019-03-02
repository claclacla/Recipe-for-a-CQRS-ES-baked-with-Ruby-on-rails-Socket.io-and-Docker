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

  mapGetFilters(filters) {
    var getFilters = [];

    if (filters === undefined) {
      return undefined;
    }

    if (filters[this.GET_FILTER_SORT]) {
      getFilters.push({ $sort: filters[this.GET_FILTER_SORT] });
    }

    if (filters[this.GET_FILTER_SKIP]) {
      var skip = parseInt(filters[this.GET_FILTER_SKIP]);

      if (isNaN(skip)) {
        throw new Error("skip filter is NOT a valid number");
      }

      getFilters.push({ $skip: skip });
    }

    if (filters[this.GET_FILTER_LIMIT]) {
      var limit = parseInt(filters[this.GET_FILTER_LIMIT]);

      if (isNaN(limit)) {
        throw new Error("limit filter is NOT a valid number");
      }

      getFilters.push({ $limit: limit });
    }

    return getFilters;
  }

  get(match, filters) {

  }

  remove(filter) {

  }
}

module.exports = ProductRepository