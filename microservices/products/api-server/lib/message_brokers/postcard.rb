require 'singleton'

require 'postcard_rb'
require 'postcard_rb/errors/PostcardConnectionRefused'
require 'postcard_rb/dispatchers/RabbitMQ/RabbitMQDispatcher'
require 'postcard_rb/Routing'

module MessageBrokers
  class Postcard
    include Singleton

    def connect
      @value = 1
      puts "connect"
      puts @value
    end

    def send
      puts "send"
      puts @value
      puts "sent"
    end
  end
end