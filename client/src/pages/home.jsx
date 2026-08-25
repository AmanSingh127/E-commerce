import { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import './home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError('Could not load products. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <section className="hero">
        <h1>Build your rig.<br /><span className="accent-text">Own your game.</span></h1>
        <p className="hero-sub">Gaming gear picked apart, spec by spec — and a builder that checks compatibility for you.</p>
      </section>

      <h2 className="section-title">All Products</h2>

      {loading && <p className="status-text">Loading products...</p>}
      {error && <p className="status-text error">{error}</p>}

      <div className="product-grid">
        {products.map((product) => (
         <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;