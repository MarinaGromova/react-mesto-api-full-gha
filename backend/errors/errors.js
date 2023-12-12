const BadRequestError = require('./BadRequestError');
const ConflictError = require('./ConflictError');
const NotFoundError = require('./NotFoundError');
const AuthorizationError = require('./AuthorizationError');
const ForbiddenError = require('./ForbiddenError');

module.exports = {
  BadRequestError,
  ConflictError,
  NotFoundError,
  AuthorizationError,
  ForbiddenError,
};
