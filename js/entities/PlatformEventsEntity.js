const IEntity = require("./IEntity");

class PlatformEventsEntity extends IEntity {
  constructor({ uid, event, data }) {
    super({ uid });

    if (event === undefined) {
      throw new Error("event is a required parameter");
    }

    if (data === undefined) {
      throw new Error("data is a required parameter");
    }

    this.event = event;
    this.data = data;
  }
}

module.exports = PlatformEventsEntity