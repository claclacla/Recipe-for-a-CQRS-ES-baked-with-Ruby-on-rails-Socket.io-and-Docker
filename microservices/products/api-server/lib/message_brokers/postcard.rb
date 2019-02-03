require 'singleton'

require 'postcard_rb'
require 'postcard_rb/errors/PostcardConnectionRefused'
require 'postcard_rb/dispatchers/RabbitMQ/RabbitMQDispatcher'
require 'postcard_rb/Routing'

module MessageBrokers
  class Postcard
    include Singleton

    include Errors::Application
    include Print

    def connect host: nil
      raise Application::MissingParameter if host.nil? 

      dispatcher = RabbitMQDispatcher.new(host: host)
      postcardRB = PostcardRB.new(dispatcher: dispatcher)
      
      begin
        postcardRB.connect
      rescue PostcardConnectionRefused
        Print::error(code: 10001, message: "RabbitMQ connection refused")
        abort "RabbitMQ connection refused"
      end
    end

    def send
      puts "send"
      puts @value
      puts "sent"
    end
  end
end