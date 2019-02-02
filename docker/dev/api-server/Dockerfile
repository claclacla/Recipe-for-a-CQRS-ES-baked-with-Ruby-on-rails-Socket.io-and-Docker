FROM ruby:2.5.3

COPY ruby-on-rails /usr/src/app
WORKDIR /usr/src/app
RUN bundle install

CMD rm -f tmp/pids/server.pid \
  && rake db:seed \
  && rails s