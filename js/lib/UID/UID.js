const UID_LENGTH = 16;

class UID {
  static create() {
    var uid = "";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < UID_LENGTH; i++) {
      uid += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return uid;
  }

  static isValid(uid) {
    if(uid.length != UID_LENGTH) {
      return false;
    }

    if(uid.match(/^[a-z0-9]+$/i)) {
      return true;
    }

    return false;
  }
}

module.exports = UID