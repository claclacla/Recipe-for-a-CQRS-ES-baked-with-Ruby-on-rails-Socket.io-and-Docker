const IEntity = require("./IEntity");

class PlatformEventsEntity extends IEntity {
  constructor({ uid, event, component, data }) {
    super({ uid });

    if (event === undefined) {
      throw new Error("event is a required parameter");
    }

    if (component === undefined) {
      throw new Error("component is a required parameter");
    }

    if (data === undefined) {
      throw new Error("data is a required parameter");
    }

    this.event = event;
    this.component = component;
    this.data = data;
  }

  static get ProductComponent() { return "product" }
}

module.exports = PlatformEventsEntity