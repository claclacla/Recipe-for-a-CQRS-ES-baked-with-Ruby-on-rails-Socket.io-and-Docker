class IMapper {
  constructor() {
    if (this.map === undefined) {
      throw new Error(".map() is a required method");
    }
  }
}

module.exports = IMapper