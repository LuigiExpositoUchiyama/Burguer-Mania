import React from 'react';
import styles from '../Styles/Header.module.css';
import { Link } from 'react-router-dom';
import Carrinho from '../Assets/Carrinho.svg';

const Header = ({ toggleSidebar, cart }) => {
  const totalItems = cart
    ? cart.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  return (
    <header>
      <div className={styles.header}>
        <h1 className={styles.logo}>
          <Link to="/">Burguer Mania</Link>
        </h1>
        <nav>
          <ul className={styles.nav}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/hamburguer">Hamburgers</Link>
            </li>
            <li>Contato</li>
          </ul>
        </nav>
        <div className={styles.cartContainer}>
          <img
            src={Carrinho}
            alt="Carrinho"
            className={styles.shop}
            onClick={toggleSidebar}
          />
          {totalItems > 0 && (
            <span className={styles.cartCount}>{totalItems}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
