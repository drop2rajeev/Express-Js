const csurf = require('csurf');

// CSRF protection middleware
const csrfProtection = csurf();

// List of routes to exclude (similar to Laravel's `$except`)
const exceptPaths = [
  '/api/',               // exclude all starting with /api/
  '/webhook/stripe',     // example: webhook route
  '/login-check-no-csrf' // example: route without csrf
];

function shouldExclude(reqPath) {
  return exceptPaths.some((except) =>
    reqPath.startsWith(except)
  );
}

// Wrapper middleware to conditionally apply CSRF
function csrfMiddleware(req, res, next) {
  if (shouldExclude(req.path)) {
    return next();
  }

  csrfProtection(req, res, next);
}

module.exports = csrfMiddleware;
