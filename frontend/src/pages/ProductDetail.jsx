import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { CartContext } from '../context/CartContext';

const ProductDetail = () => {
  const { slug } = useParams();
  const { addItem } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [notFound, setNotFound] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setNotFound(false);
    setProduct(null);
    api.get(`/products/slug/${slug}`)
      .then(res => setProduct(res.data))
      .catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <div className="container">
        <p className="no-products">Product not found. <Link to="/shop">Back to shop</Link></p>
      </div>
    );
  }

  if (!product) {
    return <div className="container"><p className="no-products">Loading...</p></div>;
  }

  return (
    <div className="container">
      <div className="product-detail">
        <img src={product.image} alt={product.name} />
        <div>
          <span className="product-category">{product.category ? product.category.name : 'Uncategorized'}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div className="price">${Number(product.price).toFixed(2)}</div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
            <input
              type="number"
              className="qty-input"
              min="1"
              value={qty}
              onChange={e => setQty(Math.max(1, Number(e.target.value)))}
            />
            <button
              className="btn btn-primary"
              onClick={() => { addItem(product, qty); setAdded(true); setTimeout(() => setAdded(false), 2000); }}
            >
              Add to Cart
            </button>
          </div>
          {added && <p className="form-success">Added to cart!</p>}
          <Link to="/shop" className="btn btn-secondary">&laquo; Back to Shop</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
