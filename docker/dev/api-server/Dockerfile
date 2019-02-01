FROM ruby:2.5.3

#ARG MICROSERVICE_COMPONENT
#COPY microservices/$MICROSERVICE_COMPONENT/api-server/Gemfile /tmp
#COPY microservices/$MICROSERVICE_COMPONENT/api-server/Gemfile.lock /tmp
#WORKDIR /tmp
#RUN bundle install

COPY ruby-on-rails /usr/src/app
WORKDIR /usr/src/app
RUN bundle install

CMD rm -f tmp/pids/server.pid \
  && rake db:seed \
  && rails s