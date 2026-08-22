import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="logo">
          RIG<span className="logo-accent">.</span>
        </Link>
        <nav className="nav-links">
          <Link to="/products">Shop</Link>
          <Link to="/builder">PC Builder</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;