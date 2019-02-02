FROM ruby:2.5.3

RUN gem install bunny -v 2.13.0
RUN gem install interface
RUN gem install mongo
RUN gem install postcard_rb -v 0.0.5

CMD ruby $MICROSERVICE_PATH