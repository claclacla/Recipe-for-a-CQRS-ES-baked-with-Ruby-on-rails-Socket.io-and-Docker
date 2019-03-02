const platformEventsModelFactory = require("./modelFactories/platformEventsModelFactory");
const PlatformEventsEntity = require("../../entities/DataSource/PlatformEventsEntity");
const IRepository = require("../IRepository");
const UID = require("../../lib/UID/UID");

const DatabaseError = require('../../errors/application/DatabaseError');

class PlatformEventsRepository extends IRepository {
  constructor({ connection }) {
    if(connection === undefined) {
      throw new Error("connection is a required parameter");
    }

    super();

    this.connection = connection;
  }

  async add(platformEventsEntity) {
    if(platformEventsEntity instanceof PlatformEventsEntity === false) {
      throw new Error("The parameter is not an instance of PlatformEventsEntity");
    }

    let MongoosePlatformEvents = platformEventsModelFactory({ connection: this.connection });

    const mongoosePlatformEvents = new MongoosePlatformEvents({
      uid: platformEventsEntity.uid,
      event: platformEventsEntity.event,
      component: platformEventsEntity.component,
      data: platformEventsEntity.data
    });

    try {     
      const resMongoosePlatformEvents = await mongoosePlatformEvents.save();

      const resPlatformEventsEntity = new PlatformEventsEntity({
        uid: resMongoosePlatformEvents.uid,
        event: resMongoosePlatformEvents.event,
        component: resMongoosePlatformEvents.component,
        data: resMongoosePlatformEvents.data
      });

      return resPlatformEventsEntity;
    } catch (err) {      
      throw new DatabaseError("PlatformEventsEntity has NOT been saved");
    }    
  }

  update(query, platformEvents) {

  }

  async getByUid(uid) {

  }

  get(match, filters) {

  }

  remove(filter) {

  }
}

module.exports = PlatformEventsRepository