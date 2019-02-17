const platformEventsModelFactory = require("./modelFactories/platformEventsModelFactory");
const PlatformEventsEntity = require("../../entities/PlatformEventsEntity");
const IRepository = require("../IRepository");
const UID = require("../../lib/UID/UID");

const DatabaseError = require('../../errors/application/DatabaseError');

class PlatformEventsMongooseRepository extends IRepository {
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
      event: platformEventsEntity.event,
      component: platformEventsEntity.component,
      data: platformEventsEntity.data
    });

    try {     
      const resMongoosePlatformEvents = await mongoosePlatformEvents.save();

      const resPlatformEventsEntity = new PlatformEventsEntity({
        event: resMongoosePlatformEvents.event,
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

  mapGetFilters(filters) {
    var getFilters = [];

    if (filters === undefined) {
      return undefined;
    }

    if (filters[this.GET_FILTER_SORT]) {
      getFilters.push({ $sort: filters[this.GET_FILTER_SORT] });
    }

    if (filters[this.GET_FILTER_SKIP]) {
      var skip = parseInt(filters[this.GET_FILTER_SKIP]);

      if (isNaN(skip)) {
        throw new Error("skip filter is NOT a valid number");
      }

      getFilters.push({ $skip: skip });
    }

    if (filters[this.GET_FILTER_LIMIT]) {
      var limit = parseInt(filters[this.GET_FILTER_LIMIT]);

      if (isNaN(limit)) {
        throw new Error("limit filter is NOT a valid number");
      }

      getFilters.push({ $limit: limit });
    }

    return getFilters;
  }

  get(match, filters) {

  }

  remove(filter) {

  }
}

module.exports = PlatformEventsMongooseRepository