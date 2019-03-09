const assert = require("assert");

class ProductService {
  constructor({ server, access_token }) {
    this.server = server;
  }

  insert({ product, resolve, reject }) {
    this.server
      .post("/products")
      .send({
        "data": product
      })
      .expect("Content-type", /json/)
      .expect(202)
      .end(function (err, res) {
        if (err) {
          return reject(res.body);
        }

        resolve();
      });
  }

  getById() {

  }

  get() {

  }

  update() {

  }

  count() {

  }

  delete() {

  }
}

module.exports = ProductService;