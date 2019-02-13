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

module.exports = mongoose.Schema({
	uid: String,
  event: String,
  data: {}
}, mongooselib.schema_options);