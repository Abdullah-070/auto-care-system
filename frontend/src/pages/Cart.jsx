import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const { items, updateQuantity, removeItem, total } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="container cart-container">
      <div className="page-header">
        <h2>Your Cart</h2>
      </div>

      {items.length === 0 ? (
        <p className="no-products">Your cart is empty. <Link to="/shop">Continue shopping</Link></p>
      ) : (
        <>
          <table>
            <thead>
              <tr><th>Product</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th></th></tr>
            </thead>
            <tbody>
              {items.map(({ product, quantity }) => (
                <tr key={product._id}>
                  <td>
                    <div className="cart-item-info">
                      <img src={product.image} alt={product.name} className="cart-item-image" />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td>${Number(product.price).toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      className="qty-input"
                      min="1"
                      value={quantity}
                      onChange={e => updateQuantity(product._id, Number(e.target.value))}
                    />
                  </td>
                  <td>${(product.price * quantity).toFixed(2)}</td>
                  <td>
                    <button className="cart-remove-btn" onClick={() => removeItem(product._id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button className="btn btn-primary" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
