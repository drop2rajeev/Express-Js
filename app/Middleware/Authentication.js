const jwt = require('jsonwebtoken');

/**
 * Middleware: Session-based Authentication (for Guest)
 */
function guestAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return res.redirect('/dashboard');
  }
  next();
}

/**
 * Middleware: Session-based Authentication (for Web)
 */
function sessionAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

/**
 * Middleware: JWT Authentication (for API)
 */
function tokenAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'Unauthorized',
    });
  }

  jwt.verify(token, process.env.APP_KEY, (err, user) => {
    if (err) {
        return res.status(403).json({
            status: false,
            message: 'Invalid or expired token',
        });
    }
    req.user = user;
    next();
  });
}

module.exports = {
    guestAuth,
    sessionAuth,
    tokenAuth
};