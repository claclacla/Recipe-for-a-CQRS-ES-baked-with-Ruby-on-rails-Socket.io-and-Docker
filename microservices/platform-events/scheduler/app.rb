require 'json'

require 'postcard_rb'
require 'postcard_rb/errors/PostcardConnectionRefused'
require 'postcard_rb/dispatchers/RabbitMQ/RabbitMQDispatcher'
require 'postcard_rb/Routing'

require_relative '../../../ruby/lib/printExecutionTime'
require_relative '../../../ruby/lib/printError'

# Initialize RabbitMQ

dispatcher = RabbitMQDispatcher.new(host: "rabbitmq")
postcardRB = PostcardRB.new(dispatcher: dispatcher)

begin
  postcardRB.connect
rescue PostcardConnectionRefused
  printError(code: 10001, error: "RabbitMQ connection refused")
  abort "RabbitMQ connection refused"
end

printExecutionTime

platformEventsTopic = postcardRB.createTopic(name: "platform-events", routing: Routing.Explicit)
onScheduleEvent = platformEventsTopic.createRoom(name: "event.schedule", exclusive: true, autoDelete: true)

onScheduleEvent.subscribe { |delivery_info, properties, payload|
  puts "New event!"
}