messageBrokerClient = MessageBrokerClient::Initializer.connect(host: "rabbitmq")

MessageBrokerClient::Topics::PlatformEventsScheduler.instance.create(messageBrokerClient: messageBrokerClient)