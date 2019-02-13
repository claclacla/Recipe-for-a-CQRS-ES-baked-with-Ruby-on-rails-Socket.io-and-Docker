class IRepository {
  constructor() {
    if (this.add === undefined) {
      throw new Error(".add() is a required method");
    }

    if (this.update === undefined) {
      throw new Error(".update() is a required method");
    }

    if (this.getByUid === undefined) {
      throw new Error(".getByUid() is a required method");
    }

    this.GET_FILTER_SKIP = "skip";
    this.GET_FILTER_LIMIT = "limit";
    this.GET_FILTER_SORT = "sort";

    this.GET_FILTERS = [
      this.GET_FILTER_SKIP,
      this.GET_FILTER_LIMIT,
      this.GET_FILTER_SORT
    ];

    if (this.mapGetFilters === undefined) {
      throw new Error(".mapGetFilters() is a required method");
    }

    if (this.get === undefined) {
      throw new Error(".get() is a required method");
    }

    if (this.remove === undefined) {
      throw new Error(".remove() is a required method");
    }
  }

  validateGetFilters(filters) {
    if (filters === undefined) {
      return undefined;
    }

    Object.keys(filters).forEach(key => {
      if (this.GET_FILTERS.indexOf(key) < 0) {
        throw new Error("No valid filter passed to repository with key: " + key);
      }

      if ([this.GET_FILTER_SKIP, this.GET_FILTER_LIMIT].indexOf(key) >= 0) {
        if (isNaN(parseInt(filters[key]))) {
          throw new Error("No valid " + key + " value: " + filters[key]);
        }
      }
    });

    return filters;
  }
}

module.exports = IRepository