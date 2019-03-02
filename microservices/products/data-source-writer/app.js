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
const DataSourceProductRepository = require("../../../js/repositories/DataSource/ProductRepository");

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

  let dataSourceConnection = null;

  try {
    dataSourceConnection = await mongooseConnect(config.databases.dataSource);
  } catch (error) {
    printError(10002, error);
    return;
  }

  let platformEventsSchedulerTopic = postcard.createTopic({ name: "platform-events-scheduler", routing: Routing.Explicit });
  let onCreatedProductPlatformEvent = null;

  let dataSourceTopic = postcard.createTopic({ name: "data-source", routing: Routing.Explicit });

  printExecutionTime();

  try {
    onCreatedProductPlatformEvent = await platformEventsSchedulerTopic.createRoom({ name: "platform-event.created.product", autoDelete: true });
  } catch (error) {
    printError(10003, error);
    return;
  }

  // TODO: Add a payload parser

  onCreatedProductPlatformEvent.subscribe(async function onCreatedProductPlatformEventSubscriber(msg) {
    let payload = JSON.parse(msg.content);

    let productEntity = new ProductEntity({
      name: payload.name,
      price: payload.price
    });

    let dataSourceProductRepository = new DataSourceProductRepository({ connection: dataSourceConnection });

    try {
      await dataSourceProductRepository.add(productEntity);

      dataSourceTopic.publish({
        room: "product.created",
        payload: JSON.stringify(productEntity)
      });
    } catch (error) {

      // TODO: Handle this error

      console.log(error);

    }
  });
})();