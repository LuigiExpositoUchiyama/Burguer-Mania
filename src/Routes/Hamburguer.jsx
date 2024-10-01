import React from 'react';
import styles from '../Styles/Hamburguer.module.css';
import H1 from '../Assets/H1.png';
import H2 from '../Assets/H2.png';
import H3 from '../Assets/H3.png';
import H4 from '../Assets/H4.png';

const Hamburguer = ({ burgers, addToCart }) => {
  const burgerImages = {
    0: H1,
    1: H2,
    2: H3,
    5: H4,
    9: H1,
    10: H2,
    11: H3,
    13: H4,
  };

  const burgerPrices = {
    0: 30.0,
    1: 32.5,
    2: 35.0,
    5: 40.5,
    9: 29.0,
    10: 37.5,
    11: 45.0,
    13: 42.0,
  };

  const handleBuy = (burger) => {
    const burgerWithDetails = {
      id: burger.id,
      name: burger.name,
      price: burgerPrices[burger.id],
      image: burgerImages[burger.id],
    };
    addToCart(burgerWithDetails);
  };

  return (
    <section className={styles.burguerContainer}>
      <div className={styles.menu}>
        {burgers.map((burger) => (
          <div key={burger.id} className={styles.burguer}>
            <h2>{burger.name}</h2>
            <img
              src={burgerImages[burger.id] || 'default-image.png'}
              alt={burger.name}
              className={styles.burgerImage}
            />
            <div className={styles.description}>
              <p>{burger.description}</p>
              <p>Ingredients: {burger.ingredients.join(', ')}</p>
            </div>
            <div className={styles.priceButton}>
              <span>
                R$ {burgerPrices[burger.id]?.toFixed(2) || 'Indisponivel'}
              </span>
              <button
                className={styles.buyButton}
                onClick={() => handleBuy(burger)}
              >
                Comprar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hamburguer;
