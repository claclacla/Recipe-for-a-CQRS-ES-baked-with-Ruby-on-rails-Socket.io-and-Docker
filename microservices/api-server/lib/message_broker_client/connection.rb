require 'singleton'

require 'postcard_rb'
require 'postcard_rb/errors/PostcardConnectionRefused'
require 'postcard_rb/dispatchers/RabbitMQ/RabbitMQDispatcher'

module MessageBrokerClient
  class Connection
    include Singleton
 
    include Errors::Application
    include Errors::MessageBrokerClient

    @messageBrokerClient = nil
  
    def get
      return @messageBrokerClient if !@messageBrokerClient.nil?

      dispatcher = RabbitMQDispatcher.new(host: "rabbitmq")

      @messageBrokerClient = PostcardRB.new(dispatcher: dispatcher)
      
      begin
        @messageBrokerClient.connect
      rescue PostcardConnectionRefused
        raise MessageBrokerClient::ConnectionFailure, "Message broker connection failure"
      end

      @messageBrokerClient
    end
  end
end