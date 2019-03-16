require 'singleton'

require 'postcard_rb/Routing'

module MessageBrokerClient
  module Topics
    class PlatformEventsScheduler  
      include Singleton
  
      @topic = nil

      def create
        messageBrokerClient = MessageBrokerClient::Connection.instance.get

        @topic = messageBrokerClient.createTopic(name: "platform-events-scheduler", routing:   Routing.Explicit)
      end
  
      def publish payload:
        create if @topic.nil?

        @topic.publish(
          room: "platform-event.schedule",
          payload: payload.to_json
        )
      end

      private :create
    end
  end
end