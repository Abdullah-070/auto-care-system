const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const secret = process.env.JWT_SECRET || config.get('jwtSecret');
    const decoded = jwt.verify(token, secret);

    // Payload is flat: { user_id, role } (see routes/api/auth.js) — NOT nested under .user
    if (decoded.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied: Admin only' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
