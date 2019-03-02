const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const mongooselib = {
	schema_options: {
  		toObject: {
    			transform: function (doc, ret) {
      				delete ret.__v;
    			}
  		},
  		toJSON: {
    			transform: function (doc, ret) {
      				delete ret.__v;
    			}
  		}
	}
};

let productSchema = mongoose.Schema({
	uid: String,
	name: String,
	price: Number
}, mongooselib.schema_options);

module.exports = function productModelFactory({ connection }) {
  return connection.model('Product', productSchema, 'products');
}