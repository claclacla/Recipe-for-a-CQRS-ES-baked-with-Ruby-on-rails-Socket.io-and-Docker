var supertest = require("supertest");
var assert = require("assert");

// Example: sudo docker exec -e apiaddress="http://api-gateway" -it DEVMachine mocha /usr/src/app/tests/integration/products/product.insert.js

var apiaddress = process.env.apiaddress;
var server = supertest.agent(process.env.apiaddress);

describe('Insert a product', function () {
  describe("When the payload contains valid data", function () {
    it('Should place a new product', function (done) {
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
  
          done();
        });
    });
  });
});