# Recipe for a CQRS + ES baked with Ruby on rails, Socket.io and Docker

## **A CQRS + Event storming backend solution with a microservice flavour**

## Architecture

### **Database**

#### Source database
Contains the sections raw data and the events sourcing collection.

Tables:
* events
    * Fields: service_name, operation, payload, creation time, execution time
    * Accepted operation: `INSERT`
* orders

#### Presentation database
Contains the readable data composed in complex objects prepared for reading operations.

Tables:
* orders

### **Microservices**

#### Events writer
This microservice inserts new events to the `events` collection with the type and the payload.

#### Orders events manager
This microservice checks periodically if there are new commands into the `events` collection and execute them ordered by creation time.
After execution publish a message to notify the `orders` collection of the `Source database` update.

#### Orders readable data baker
This microservice translates the `orders` collection of the `Source database` updates in objects created for reading operations into the `orders` collection of the `Presentation database`.
After the data were written, it sends a message in order to inform the `Presentation database` change.

### **API**

#### Order

* POST /order
    * Publish a message to the `Events writer` microservice with the order data
    * In case of success it returns `202 Accepted` with an empty payload

* GET /order
    * Read the orders list directly from the `Presentation database` without any transformation

* GET /order/<order id>
    * Read the order detail directly from the `Presentation database` without any transformation

### **Web sockets**

#### Order

* /order-events
    * It informs about the `orders` collection data events.

## Processes

### **Write operation**

* The frontend application place a new order
* The order POST API receives a new call
* This API sends a new message to the `Events writer` microservice with the order data and responds with a `202 Accepted` status
* The `Events writer` microservice inserts this new event in the `events` collection with the type and the payload
* Meanwhile the `Orders events manager` microservice is listening for new operations in the `events` collection. When it reads this new event, it executes the related command and publishes a message in order to inform the update
* When the `Orders readable data baker` listens this message, update the `Presentation database` and publish a new message to notify about the change the `order-events` web socket
* The frontend order web socket client is informed about the insertion completed

### **Read operation**

* The frontend application calls a `GET` API in order to retrieve the orders list or detail
* The `GET` API responds with the requested data

## Topics/Rooms

```bash
# . Room:
# platform-events-scheduler

# . Topics: 
# platform-event.schedule 
# platform-event.created.product

# . Room:
# data-source

# . Topics:
# product.created

# . Room:
# products-socket

# . Topics:
# product.created

```

--------------------------------------------------------------------------------

## Initialization

The `api-server` microservice scaffolding has been initialized using the following commands:

```bash
# Create the new api server without the active record
rails new api-server --skip-active-record --api -T

# Install the dependencies
bundle install

# Create the Mongo config file
rails g mongoid:config

# Create the products structures
rails g scaffold product name:string price:float

# Create the orders structures
rails g model order_product name:string price:float

rails g scaffold order number:integer date:datetime products:array

```

--------------------------------------------------------------------------------

### TODO

* Ruby on rails:
    * Use a different "id" field than "_id" for retrieving documents
    * API requests parameters and payloads parsers
    * Objects mappers
    * API responses 
    * API error responses 
    * OAuth 2
    * CORS
    * File upload using AWS S3
    * Send email or sms
    * Add a more complex API payload object
    * Add a config file(The rabbitmq address is statically written on message_broker.rb file)

* Database:
    * platform events:
        * Add a status property

* Microservices:
    * Add the service name after the "Execution time"
    * Add a cron service per component for checking the unparsed platform events
    * Add a cron service per component for checking the unparsed source data
    * Add services for changing the related components on update/delete 

* Web sockets:
    * requests parameters and payloads parsers

--------------------------------------------------------------------------------

### Prerequisites

What things you need to install the software

```
docker 17+
docker-compose 1.19.0+

```

--------------------------------------------------------------------------------

### Testing

```
#

```

--------------------------------------------------------------------------------

### Development

```bash
# Move to the main application folder
cd /path-to-your-local/app

# Products api server is used for experimentation with ruby on rails.
# Build it with the ruby-on-rails-experimental image
sudo docker build -f docker/dev/api-server/Dockerfile . -t claclacla/api-server

# Change the directory to the docker development 
cd docker/dev

# Create a .env file with your local application folder
echo "APP_FOLDER=/path-to-your-local/app" > .env 

# Run the micro services using docker compose
sudo docker-compose up -d

# During this operation the database will be seeded with the api server db seeds

```

#### Docker services

```
# API server
Port: 80

```

--------------------------------------------------------------------------------

## Authors

- **Simone Adelchino** - [_claclacla_](https://twitter.com/_claclacla_)

--------------------------------------------------------------------------------

## License

This project is licensed under the MIT License

--------------------------------------------------------------------------------

## Acknowledgments

- [How to build an API using Ruby on rails](https://codeburst.io/how-to-build-a-good-api-using-rubyonrails-ef7eadfa3078)
- [Docker compose and Ruby on rails](https://docs.docker.com/v17.09/compose/rails/)
- [Mongoid: Official object/document mapper for MongoDB written in Ruby](https://docs.mongodb.com/mongoid/master/tutorials/mongoid-rails/)
- [Reactive manifesto](https://www.reactivemanifesto.org/)
- [A comparison on traditional backend solution vs CQRS + ES architecture](https://www.bouvet.no/bouvet-deler/utbrudd/a-simple-todo-application-a-comparison-on-traditional-vs-cqrs-es-architecture )