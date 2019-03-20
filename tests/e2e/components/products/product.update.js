const supertest = require("supertest");
const assert = require("assert");
const io = require('socket.io-client');

const ProductFactory = require("../../factories/ProductFactory");
const ProductService = require("../../services/ProductService");

// Example: sudo docker exec -e apiaddress="http://api-gateway" -it DEVMachine mocha /usr/src/app/tests/e2e/components/products/product.update.js

const apiAddress = process.env.apiaddress;
const server = supertest.agent(apiAddress);

describe('Update a product', function () {
  describe("When the payload contains valid data", function () {
    it('Should update a product', function (done) {
      let productService = new ProductService({ server });

      // Create a new product

      let product = ProductFactory.create({
        name: "Product 1",
        price: 4.5
      });

      // Create the web socket response manager

      const productsSocket = io(apiAddress, {
        transports: ["websocket"],
        path: "/products/socket"
      });

      productsSocket.on('product.created', function (data) {
        console.log("product created!");
        
        assert(data.hasOwnProperty("product"), "The response data payload has NO product");

        let resProduct = data.product;

        assert(resProduct.hasOwnProperty("uid"), "The response product has NO uid property");
        assert(resProduct.hasOwnProperty("name"), "The response product has NO name property");
        assert(resProduct.name === product.name, "The response product name value is NOT equal to the new product name value");
        assert(resProduct.hasOwnProperty("price"), "The response product has NO price property");
        assert(resProduct.price === product.price, "The response product price value is NOT equal to the new product price value");

        // Update the product

        product.name = "Product 2";

        productService.update({
          uid: resProduct.uid,
          product,
          resolve: () => {
            console.log("product update!");
            
            productsSocket.disconnect();
            done();
          },
          reject: (payload) => {

          }
        });
      });

      /*
      productsSocket.on('product.updated', function (data) {
        assert(data.hasOwnProperty("product"), "The response data payload has NO product");

        let resProduct = data.product;

        assert(resProduct.hasOwnProperty("uid"), "The response product has NO uid property");
        assert(resProduct.hasOwnProperty("name"), "The response product has NO name property");
        assert(resProduct.name === product.name, "The response product name value is NOT equal to the new product name value");
        assert(resProduct.hasOwnProperty("price"), "The response product has NO price property");
        assert(resProduct.price === product.price, "The response product price value is NOT equal to the new product price value");

        productsSocket.disconnect();
        done();
      });
      */

      // Insert the new product

      productService.insert({
        product,
        resolve: () => {
          console.log("product insert!");
        },
        reject: (payload) => {

        }
      });
    });
  });
});