FROM node:10.15.1-slim

ENV NODE_PATH /usr/local/lib/node_modules/

WORKDIR /usr/src/app/tests

RUN npm i -g mocha@5.2.0 \
    assert@1.4.1 \
    socket.io-client@2.2.0 \
    supertest@3.4.2 

CMD sleep infinity