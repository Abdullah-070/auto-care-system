const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * verifyToken Middleware
 * Extracts JWT from Authorization header using the Bearer <token> convention.
 * Verifies the token using the secret key.
 * Appends decoded user information to req.user for downstream use.
 * Returns 401 if token is missing, 403 if token is invalid/expired.
 */
const verifyToken = function(req, res, next) {
  // Extract token from Authorization header: "Bearer <token>"
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token provided, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded; // Attach decoded payload (user_id, role) to request
    next();
  } catch (err) {
    return res.status(403).json({ msg: 'Token is invalid or expired' });
  }
};

module.exports = verifyToken;
