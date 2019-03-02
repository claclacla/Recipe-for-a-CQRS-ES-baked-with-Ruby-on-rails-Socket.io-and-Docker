FROM node:10.15.1-slim

RUN apt-get update \
  && apt-get install -y python build-essential sudo

RUN sudo npm i \
  && npm i -g nodemon@1.18.10

WORKDIR /usr/src/app

CMD nodemon $MICROSERVICE_PATH/app.js --watch $MICROSERVICE_PATH --watch js