const supertest = require("supertest");
const assert = require("assert");
const io = require('socket.io-client');

// Example: sudo docker exec -e apiaddress="http://api-gateway" -it DEVMachine mocha /usr/src/app/tests/integration/products/product.insert.js

const apiAddress = process.env.apiaddress;
const server = supertest.agent(apiAddress);

describe('Insert a product', function () {
  describe("When the payload contains valid data", function () {
    it('Should place a new product', function (done) {
      const productsSocket = io(apiAddress, {
        transports: ["websocket"],
        path: "/products/socket"
      });

      productsSocket.on('product.created', function (data) {
        productsSocket.disconnect();
        done();
      });

      server
        .post("/products")
        .send({
          "data": {
            name: "Product 1",
            price: 4.5
          }
        })
        .expect("Content-type", /json/)
        .expect(202)
        .end(function (err, res) {
          if (err) throw err;
        });
    });
  });
});