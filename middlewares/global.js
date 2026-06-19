const Category = require('../models/Category');

module.exports = async (req, res, next) => {
  // Pass current flash messages to locals for rendering
  res.locals.success_msg = req.flash('success');
  res.locals.error_msg = req.flash('error');

  // 2. Pass Current User to locals
  res.locals.user = req.session.user || null;

  // 3. Load Categories for dropdown
  try {
    const categories = await Category.find().sort('name');
    res.locals.categories = categories;
  } catch (err) {
    res.locals.categories = [];
  }

  // 4. Load Cart items count
  const cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];
  res.locals.cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  next();
};
