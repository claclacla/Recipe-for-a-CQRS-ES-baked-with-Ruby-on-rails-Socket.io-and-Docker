const UID = require('../lib/UID/UID');

class IEntity {
  constructor({ uid }) {
    if (uid === undefined) {
      uid = UID.create();
    }

    this.uid = uid;
  }
}

module.exports = IEntity