const ApplicationError = require('./ApplicationError');

class DatabaseError extends ApplicationError {
  constructor(...params) {
    super(...params);
  }
}

module.exports = DatabaseError