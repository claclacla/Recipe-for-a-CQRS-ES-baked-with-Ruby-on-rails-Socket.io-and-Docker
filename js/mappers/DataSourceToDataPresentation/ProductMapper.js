const IMapper = require("../IMapper");

const DataSourceProductEntity = require("../../entities/DataSource/ProductEntity");
const DataPresentationProductEntity = require("../../entities/DataPresentation/ProductEntity");

class ProductMapper extends IMapper {
  constructor() {
    super();
  }

  map(dataSourceProductEntity) {
    if(dataSourceProductEntity instanceof DataSourceProductEntity === false) {
      throw new Error("The parameter is not an instance of DataSourceProductEntity");
    }

    let dataPresentationProductEntity = new DataPresentationProductEntity({
      name: dataSourceProductEntity.name,
      price: dataSourceProductEntity.price
    });

    return dataPresentationProductEntity;
  }
}

module.exports = ProductMapper;