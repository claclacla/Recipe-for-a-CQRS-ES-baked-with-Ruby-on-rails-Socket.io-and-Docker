FROM node:10.15.1-slim

RUN apt-get update \
  && apt-get install -y python build-essential sudo

CMD sudo npm install --prefix /usr/src/app \
  && node $MICROSERVICE_PATH