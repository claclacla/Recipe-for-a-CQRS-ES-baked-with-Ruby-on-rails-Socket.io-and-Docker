const heapdump = require("heapdump");

const printExecutionTime = require("../../../js/lib/printExecutionTime");
const printError = require("../../../js/lib/printError");

const RabbitMQDispatcher = require('postcard-js/dispatchers/RabbitMQ/RabbitMQDispatcher');
const Postcard = require('postcard-js/Postcard');
const Routing = require('postcard-js/Routing');

(async () => {

  // RabbitMQ

  const rabbitMQDispatcher = new RabbitMQDispatcher({
    host: "amqp://rabbitmq"
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

  let platformEventsSchedulerTopic = postcard.createTopic({ name: "platform-events-scheduler", routing: Routing.Explicit });
  let onPlatformEventSchedule = null;

  printExecutionTime();

  try {
    onPlatformEventSchedule = await platformEventsSchedulerTopic.createRoom({ name: "platform-event.schedule", autoDelete: true });
  } catch (error) {
    printError(10003, error);
    return;
  }

  onPlatformEventSchedule.subscribe(async function onPlatformEventScheduleSubscriber(msg) {
    let content = JSON.parse(msg.content);

    console.log(content);
  });
})();