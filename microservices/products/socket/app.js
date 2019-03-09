//const heapdump = require("heapdump");
const server = require('http').createServer();
const PubSub = require("pubsub-js");

const APP_ENV = process.env.APP_ENV;

const config = require("../../../config.json")[APP_ENV];

const RabbitMQDispatcher = require('postcard-js/dispatchers/RabbitMQ/RabbitMQDispatcher');
const Postcard = require('postcard-js/Postcard');
const Routing = require('postcard-js/Routing');

const printExecutionTime = require("../../../js/lib/printExecutionTime");
const printError = require("../../../js/lib/printError");

const DataPresentationProductEntity = require("../../../js/entities/DataPresentation/ProductEntity");

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

  let productsSocketTopic = postcard.createTopic({ name: "products-socket", routing: Routing.PatternMatching });
  let onProduct = null;

  printExecutionTime();

  try {
    onProduct = await productsSocketTopic.createRoom({ name: "product.*", autoDelete: true });
  } catch (error) {
    printError(10003, error);
    return;
  }

  // TODO: Add a payload parser

  onProduct.subscribe(async function onProduct(msg) {
    let payload = JSON.parse(msg.content);

    if (msg.fields.routingKey === "product.created") {
      let dataPresentationProductEntity = new DataPresentationProductEntity({
        uid: payload.uid,
        name: payload.name,
        price: payload.price
      });

      console.log(msg.fields.routingKey, payload);
      PubSub.publish("product.created", dataPresentationProductEntity);
    }
  });

  // Socket.io

  const io = require('socket.io')(server, {
    path: '/',
    serveClient: false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
  });

  server.listen(3000);

  io.on('connection', function onSocketIOConnection(socket) {
    let onProductCreated = PubSub.subscribe("product.created", function onProductCreatedCallback(msg, dataPresentationProductEntity) {

      socket.emit('product.created', {
        product: dataPresentationProductEntity
      });
    });

    socket.on('disconnect', function onSOcketIODisconnect() {      
      PubSub.unsubscribe(onProductCreated);
    });
  });
})();