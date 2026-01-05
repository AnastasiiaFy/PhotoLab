import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../assets/icons/lotus-logo-black.png';

import catalogIconNA from '../assets/icons/catalogue-unactive.png';
import cartIconNA from '../assets/icons/cart-unactive.png';
import profileIconNA from '../assets/icons/user-unactive.png';

import catalogIconA from '../assets/icons/catalogue-active.png';
import cartIconA from '../assets/icons/cart-active.png';
import profileIconA from '../assets/icons/user-active.png';
import { ShopContext } from '../context/shopContex';

import CartSidebar from "./CartSidebar"; 


const Header = ({ user }) => {
  const location = useLocation();
  const path = location.pathname;

  const {getCartCount} = useContext(ShopContext)
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="page-wrapper">
      <header className="header">
            <div className="logo">
              <Link to="/">
                <div className="logo-container">
                  <img src={logo} alt="Lumina Lotus" className="icon-logo" />
                </div>
              </Link>
            </div>

            <nav className="nav">
              <Link to="/catalogue">
                <img
                  src={path === '/catalogue' ? catalogIconA : catalogIconNA}
                  alt="Каталог"
                  className="icon"
                />
              </Link>

              {/* Корзина */}
              <div className="cart-wrapper">
                <button
                  className="cart-button"
                  onClick={() => setIsCartOpen(prev => !prev)} // переключає відкриття sidebar
                >
                  <img
                    src={isCartOpen ? cartIconA : cartIconNA}
                    alt="Корзина"
                    className="icon"
                  />
                  <div className="cart-badge">{getCartCount()}</div>
                </button>
              </div>


              {user ? (
                <Link to="/profile">
                  <img
                    src={path === '/profile' ? profileIconA : profileIconNA}
                    alt="Особистий кабінет"
                    className="icon"
                  />
                </Link>
              ) : (
                <Link to="/login" className="login-text">
                  Увійти
                </Link>
              )}
            </nav>
        </header>

        <CartSidebar
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
    </div>
    
  );
};

export default Header;
