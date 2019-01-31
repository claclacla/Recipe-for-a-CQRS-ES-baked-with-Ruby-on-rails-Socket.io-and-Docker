FROM node:9.2-slim

RUN apt-get update \
  && apt-get install -y python build-essential \
  && apt-get install -y sudo

CMD /usr/src/app/docker/dev/js-microservice/docker_init.sh
