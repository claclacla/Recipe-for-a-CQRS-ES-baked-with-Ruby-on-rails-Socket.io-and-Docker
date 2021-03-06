//const heapdump = require("heapdump");

const APP_ENV = process.env.APP_ENV;

const config = require("../../../config.json")[APP_ENV];

const RabbitMQDispatcher = require('postcard-js/dispatchers/RabbitMQ/RabbitMQDispatcher');
const Postcard = require('postcard-js/Postcard');
const Routing = require('postcard-js/Routing');

const printExecutionTime = require("../../../js/lib/printExecutionTime");
const printError = require("../../../js/lib/printError");

const mongooseConnect = require("../../../js/lib/Mongoose/connect");

const DataSourceProductEntity = require("../../../js/entities/DataSource/ProductEntity");
const DataPresentationProductEntity = require("../../../js/entities/DataPresentation/ProductEntity");
const DataSourceToDataPresentationProductMapper = require("../../../js/mappers/DataSourceToDataPresentation/ProductMapper");
const DataPresentationProductRepository = require("../../../js/repositories/DataPresentation/ProductRepository");

(async () => {

  // RabbitMQ

  const rabbitMQDispatcher = new RabbitMQDispatcher({
    host: "amqp://" + config.rabbitmq.host
  });
  const postcard = new Postcard({
    dispatcher: rabbitMQDispatcher
  });

  try {
    await postcard.connect();
  } catch (error) {
    printError(10001, error);
    return;
  }

  // Mongoose

  let dataPresentationConnection = null;

  try {
    dataPresentationConnection = await mongooseConnect(config.databases.dataPresentation);
  } catch (error) {
    printError(10002, error);
    return;
  }

  let dataSourceTopic = postcard.createTopic({ name: "data-source", routing: Routing.Explicit });
  let onDataSourceProductCreated = null;

  let productsSocketTopic = postcard.createTopic({ name: "products-socket", routing: Routing.PatternMatching });

  printExecutionTime();

  try {
    onDataSourceProductCreated = await dataSourceTopic.createRoom({ name: "product.created", autoDelete: true });
  } catch (error) {
    printError(10003, error);
    return;
  }

  // TODO: Add a payload parser

  onDataSourceProductCreated.subscribe(async function onDataSourceProductCreated(msg) {
    let payload = JSON.parse(msg.content);

    // TODO: Create a mapper for the DataPresentationProductEntity

    let dataSourceProductEntity = new DataSourceProductEntity({
      name: payload.name,
      price: payload.price
    });

    let dataSourceToDataPresentationProductMapper = new DataSourceToDataPresentationProductMapper();
    let dataPresentationProductEntity = dataSourceToDataPresentationProductMapper.map(dataSourceProductEntity);

    let dataPresentationProductRepository = new DataPresentationProductRepository({ connection: dataPresentationConnection });

    try {
      await dataPresentationProductRepository.add(dataPresentationProductEntity);

      productsSocketTopic.publish({
        room: "product.created",
        payload: JSON.stringify(dataPresentationProductEntity)
      });
    } catch (error) {

      // TODO: Handle this error

      console.log(error);

    }
  });
})();