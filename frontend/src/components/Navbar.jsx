import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import api from '../services/api';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { count } = useContext(CartContext);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showCats, setShowCats] = useState(false);

  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data)).catch(() => setCategories([]));
  }, []);

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Auto Care" />
          <span>Auto Care</span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li
            style={{ position: 'relative' }}
            onMouseEnter={() => setShowCats(true)}
            onMouseLeave={() => setShowCats(false)}
          >
            <span style={{ cursor: 'pointer' }}>Categories ▾</span>
            {showCats && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, background: '#fff',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: 6, minWidth: 180, zIndex: 10
              }}>
                {categories.length === 0 && <div style={{ padding: '10px 16px', color: '#64748b' }}>No categories</div>}
                {categories.map(cat => (
                  <Link
                    key={cat._id}
                    to={`/shop?category=${cat._id}`}
                    style={{ display: 'block', padding: '10px 16px' }}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </ul>
        <ul className="nav-links">
          <li>
            <Link to="/cart">Cart {count > 0 && <span className="badge-cart-count">{count}</span>}</Link>
          </li>
          {user ? (
            <>
              <li>Hi, {user.name}</li>
              <li>
                <button className="btn btn-secondary" onClick={() => { logout(); navigate('/'); }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
