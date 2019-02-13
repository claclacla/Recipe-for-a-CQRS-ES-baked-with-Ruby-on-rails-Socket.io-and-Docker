class ApplicationError extends Error {
  constructor(...params) {
    super(...params);
    Error.captureStackTrace(this, ApplicationError);
  }
}

module.exports = ApplicationError