require 'singleton'

require 'postcard_rb'
require 'postcard_rb/errors/PostcardConnectionRefused'
require 'postcard_rb/dispatchers/RabbitMQ/RabbitMQDispatcher'
require 'postcard_rb/Routing'

class MessageBroker
  include Singleton

  include Errors::Application

  def connect host: nil
    raise Application::MissingParameter, "Missing host parameter" if host.nil? 
    dispatcher = RabbitMQDispatcher.new(host: host)
    postcardRB = PostcardRB.new(dispatcher: dispatcher)
    
    begin
      postcardRB.connect
    rescue PostcardConnectionRefused
      raise Application::MessageBroker, "Message broker connection failure"
    end
  end
  
  def send
    puts "send"
    puts @value
    puts "sent"
  end
end