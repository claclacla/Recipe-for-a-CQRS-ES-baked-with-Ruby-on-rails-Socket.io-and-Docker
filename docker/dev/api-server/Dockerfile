FROM ruby:2.5.3

COPY microservices/api-server/Gemfile /tmp
COPY microservices/api-server/Gemfile.lock /tmp
WORKDIR /tmp
RUN bundle install

WORKDIR /usr/src/app/microservices/api-server

CMD rake db:seed \
  && rails s