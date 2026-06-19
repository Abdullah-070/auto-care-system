const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const verifyToken = require('../../middlewares/verifyToken');

// @route   GET /api/v1/user/profile
// @desc    Returns the authenticated user's data
// @access  Private (requires valid JWT Bearer token)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    // req.user is set by verifyToken middleware (contains user_id and role)
    const user = await User.findById(req.user.user_id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
