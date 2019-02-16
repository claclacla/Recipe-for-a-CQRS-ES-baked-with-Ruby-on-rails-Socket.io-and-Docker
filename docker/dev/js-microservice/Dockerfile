FROM node:10.15.1-slim

RUN apt-get update \
  && apt-get install -y python build-essential sudo

WORKDIR /usr/src/app

CMD sudo npm i \
  && npm i -g nodemon@1.18.10 \
  && nodemon $MICROSERVICE_PATH