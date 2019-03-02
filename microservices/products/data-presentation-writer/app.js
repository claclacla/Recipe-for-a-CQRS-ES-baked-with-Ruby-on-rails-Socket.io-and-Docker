//const heapdump = require("heapdump");

const APP_ENV = process.env.APP_ENV;

const config = require("../../../config.json")[APP_ENV];

const RabbitMQDispatcher = require('postcard-js/dispatchers/RabbitMQ/RabbitMQDispatcher');
const Postcard = require('postcard-js/Postcard');
const Routing = require('postcard-js/Routing');

const printExecutionTime = require("../../../js/lib/printExecutionTime");
const printError = require("../../../js/lib/printError");

const mongooseConnect = require("../../../js/lib/Mongoose/connect");

const ProductEntity = require("../../../js/entities/ProductEntity");
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

  let dataSourceSchedulerTopic = postcard.createTopic({ name: "data-source", routing: Routing.Explicit });
  let onCreatedProduct = null;

  printExecutionTime();

  try {
    onCreatedProduct = await dataSourceSchedulerTopic.createRoom({ name: "product.created", autoDelete: true });
  } catch (error) {
    printError(10003, error);
    return;
  }

  // TODO: Add a payload parser

  onCreatedProduct.subscribe(async function onCreatedProduct(msg) {
    let payload = JSON.parse(msg.content);

    let productEntity = new ProductEntity({
      name: payload.name,
      price: payload.price
    });

    let dataPresentationProductRepository = new DataPresentationProductRepository({ connection: dataPresentationConnection });

    try {
      await dataPresentationProductRepository.add(productEntity);

      // platformEventsSchedulerTopic.publish({
      //   room: "platform-event.created.product",
      //   payload: JSON.stringify(platformEventsEntity.data)
      // });
    } catch (error) {

      // TODO: Handle this error

      console.log(error);

    }
  });
})();