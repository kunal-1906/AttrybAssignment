import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            BUYC Corp
          </Link>
          
          <nav className="nav">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Browse Cars
            </Link>
            <Link 
              to="/add-car" 
              className={`nav-link ${location.pathname === '/add-car' ? 'active' : ''}`}
            >
              Add Car
            </Link>
            <Link 
              to="/inventory" 
              className={`nav-link ${location.pathname === '/inventory' ? 'active' : ''}`}
            >
              My Inventory
            </Link>
            <div style={{ marginLeft: '20px', color: '#666' }}>
              Welcome, {user?.name || user?.email}!
            </div>
            <button onClick={onLogout} className="btn btn-secondary">
              Logout
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
