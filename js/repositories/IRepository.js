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
}

module.exports = IRepository