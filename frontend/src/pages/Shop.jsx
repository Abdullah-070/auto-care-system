import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';

const PAGE_SIZE = 8;

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  useEffect(() => {
    Promise.all([api.get('/products'), api.get('/categories')])
      .then(([prodRes, catRes]) => {
        setAllProducts(prodRes.data);
        setCategories(catRes.data);
      })
      .catch(() => { setAllProducts([]); setCategories([]); })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { setPage(1); }, [search, category, minPrice, maxPrice]);

  const filtered = allProducts.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (category && p.category?._id !== category) return false;
    if (minPrice && p.price < Number(minPrice)) return false;
    if (maxPrice && p.price > Number(maxPrice)) return false;
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const params = {};
    for (const [k, v] of form.entries()) if (v) params[k] = v;
    setSearchParams(params);
  };

  return (
    <div className="container">
      <div className="page-header">
        <h2>Our Shop</h2>
      </div>

      <div className="filters">
        <form onSubmit={handleFilter}>
          <input type="text" name="search" placeholder="Search by name..." defaultValue={search} />
          <select name="category" defaultValue={category}>
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>
          <input type="number" name="minPrice" placeholder="Min Price" defaultValue={minPrice} step="0.01" />
          <input type="number" name="maxPrice" placeholder="Max Price" defaultValue={maxPrice} step="0.01" />
          <button type="submit" className="btn btn-primary">Filter</button>
          <button type="button" className="btn btn-secondary" onClick={() => setSearchParams({})}>Reset</button>
        </form>
      </div>

      {loading ? (
        <p className="no-products">Loading products...</p>
      ) : pageItems.length > 0 ? (
        <>
          <div className="product-grid">
            {pageItems.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              {page > 1 && <button className="btn btn-secondary" onClick={() => setPage(page - 1)}>&laquo; Prev</button>}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  className={`btn ${n === page ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
              {page < totalPages && <button className="btn btn-secondary" onClick={() => setPage(page + 1)}>Next &raquo;</button>}
            </div>
          )}
        </>
      ) : (
        <p className="no-products">No products found. Please check back later or try another category.</p>
      )}
    </div>
  );
};

export default Shop;
