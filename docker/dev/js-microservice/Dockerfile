FROM node:10.15.1-slim

ENV NODE_PATH /usr/local/lib/node_modules/

RUN apt-get update \
  && apt-get install -y python build-essential sudo

RUN sudo npm i -g heapdump@0.3.12 --unsafe-perm
RUN npm i -g amqplib@0.5.3 \
  assert@1.4.1 \
  mongoose@5.4.13 \
  postcard-js@1.0.0 \
  socket.io@2.2.0 \
  supertest@3.4.2 \ 
  nodemon@1.18.10

WORKDIR /usr/src/app

CMD nodemon $MICROSERVICE_PATH/app.js --watch $MICROSERVICE_PATH --watch js