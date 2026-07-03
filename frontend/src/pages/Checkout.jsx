import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Checkout = () => {
  const { items, total, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ address: '', city: '', zip: '' });
  const [error, setError] = useState('');
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="container">
        <p className="no-products">Your cart is empty. <Link to="/shop">Go shopping</Link></p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <p className="no-products">
          Please <Link to="/login">log in</Link> to complete your order.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPlacing(true);
    try {
      await api.post('/orders', {
        items: items.map(i => ({ product: i.product._id, quantity: i.quantity, price: i.product.price })),
        shippingAddress: form
      });
      clearCart();
      navigate('/', { state: { orderPlaced: true } });
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="container">
      <div className="auth-form-container">
        <h2>Checkout</h2>
        {error && <div className="form-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Address</label>
            <input required value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
          </div>
          <div className="form-group">
            <label>City</label>
            <input required value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
          </div>
          <div className="form-group">
            <label>ZIP Code</label>
            <input required value={form.zip} onChange={e => setForm({ ...form, zip: e.target.value })} />
          </div>
          <p style={{ marginBottom: '1rem', fontWeight: 600 }}>Order Total: ${total.toFixed(2)}</p>
          <button className="btn btn-primary" style={{ width: '100%' }} disabled={placing}>
            {placing ? 'Placing order...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
