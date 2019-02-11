require 'postcard_rb'
require 'postcard_rb/errors/PostcardConnectionRefused'
require 'postcard_rb/dispatchers/RabbitMQ/RabbitMQDispatcher'

module MessageBrokerClient
  class Initializer
 
    include Errors::Application
    include Errors::MessageBrokerClient
  
    def self.connect host: nil
      raise Application::MissingParameter, "Missing host parameter" if host.nil? 
      dispatcher = RabbitMQDispatcher.new(host: host)
      messageBrokerClient = PostcardRB.new(dispatcher: dispatcher)
      
      begin
        messageBrokerClient.connect
      rescue PostcardConnectionRefused
        raise MessageBrokerClient::ConnectionFailure, "Message broker connection failure"
      end

      messageBrokerClient
    end
  end
end