require 'singleton'

require 'postcard_rb/Routing'

module MessageBrokerClient
  module Topics
    class PlatformEventsScheduler  
      include Singleton

      include Errors::MessageBrokerClient
  
      @topic = nil

      def create
        begin
          messageBrokerClient = MessageBrokerClient::Connection.instance.get
        rescue MessageBrokerClient::ConnectionFailure
          raise MessageBrokerClient::TopicCreation, "Topic platform-events-scheduler creation failure"
        end  

        @topic = messageBrokerClient.createTopic(name: "platform-events-scheduler", routing:   Routing.Explicit)
      end
  
      def publish payload:
        begin
          create if @topic.nil?
        rescue MessageBrokerClient::TopicCreation
          raise MessageBrokerClient::Publish, "Topic platform-events-scheduler publish failure"
        end

        @topic.publish(
          room: "platform-event.schedule",
          payload: payload.to_json
        )
      end

      private :create
    end
  end
end