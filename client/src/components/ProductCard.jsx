import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product._id}`} className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-footer">
          <span className="product-price">${product.price.toFixed(2)}</span>
          <span className="product-rating">★ {product.rating}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;