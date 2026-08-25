import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/products/${product.product_id}`} className="product-card">
      <div className="product-image-wrap">
        <img src={product.image_url} alt={product.name} className="product-image" />
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <div className="product-footer">
          <span className="product-price">${Number(product.price).toFixed(2)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;