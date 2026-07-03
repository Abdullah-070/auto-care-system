import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addItem } = useContext(CartContext);

  return (
    <div className="product-card">
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} alt={product.name} className="product-image" />
      </Link>
      <div className="product-info">
        <span className="product-category">{product.category ? product.category.name : 'Uncategorized'}</span>
        <Link to={`/product/${product.slug}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>
        <p className="product-desc">{product.description}</p>
        <div className="product-bottom">
          <span className="product-price">${Number(product.price).toFixed(2)}</span>
          <button className="btn btn-secondary" onClick={() => addItem(product, 1)}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
