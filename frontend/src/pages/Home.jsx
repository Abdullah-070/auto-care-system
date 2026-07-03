import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import hero from '../assets/hero.png';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then(res => setProducts(res.data.slice(0, 8))).catch(() => setProducts([]));
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Quality Auto Spare Parts, Delivered Fast</h1>
          <p>Everything you need to keep your vehicle running — engine parts, lights, filters, and more.</p>
          <Link to="/shop" className="btn" style={{ background: '#fff', color: '#dc143c' }}>Shop Now</Link>
          {hero && <img src={hero} alt="Auto Care" />}
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <h2>Featured Products</h2>
          {products.length > 0 ? (
            <div className="product-grid">
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          ) : (
            <p className="no-products">No products found. Please check back later.</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
