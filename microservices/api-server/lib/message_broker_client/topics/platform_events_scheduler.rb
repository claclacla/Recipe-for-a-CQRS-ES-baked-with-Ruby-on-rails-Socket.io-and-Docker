require 'singleton'

require 'postcard_rb/Routing'

module MessageBrokerClient
  module Topics
    class PlatformEventsScheduler
      include Singleton
  
      def create messageBrokerClient:
        puts "Topic created: platform-events-scheduler"
        @topic = messageBrokerClient.createTopic(name: "platform-events-scheduler", routing:   Routing.Explicit)
      end
  
      def publish payload:
        puts "Publish: platform-event.schedule"
        @topic.publish(
          room: "platform-event.schedule",
          payload: payload.to_json
        )
      end
    end
  end
end