//const heapdump = require("heapdump");

const APP_ENV = process.env.APP_ENV;

const config = require("../../../config.json")[APP_ENV];

const RabbitMQDispatcher = require('postcard-js/dispatchers/RabbitMQ/RabbitMQDispatcher');
const Postcard = require('postcard-js/Postcard');
const Routing = require('postcard-js/Routing');

const printExecutionTime = require("../../../js/lib/printExecutionTime");
const printError = require("../../../js/lib/printError");

const mongooseConnect = require("../../../js/repositories/Mongoose/lib/connect");

const PlatformEventsEntity = require("../../../js/entities/PlatformEventsEntity");
const PlatformEventsRepository = require("../../../js/repositories/Mongoose/PlatformEventsMongooseRepository");

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
  let onPlatformEventSchedule = null;

  printExecutionTime();

  try {
    onPlatformEventSchedule = await platformEventsSchedulerTopic.createRoom({ name: "platform-event.schedule", autoDelete: true });
  } catch (error) {
    printError(10003, error);
    return;
  }

  // TODO: Add a payload parser

  onPlatformEventSchedule.subscribe(async function onPlatformEventScheduleSubscriber(msg) {
    let payload = JSON.parse(msg.content);

    let platformEventsEntity = new PlatformEventsEntity({
      event: payload.event,
      data: payload.data
    });

    let platformEventsRepository = new PlatformEventsRepository({ connection: dataSourceConnection });

    try {     
      await platformEventsRepository.add(platformEventsEntity); 
    } catch (error) {
      
      // TODO: Handle this error

      console.log(error);
      
    }
  });
})();