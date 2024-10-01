import React from 'react';

import styles from '../Styles/Home.module.css';

const Home = () => {
  return (
    <section className={styles.home}>
      <div>
        <p className={styles.fraseHome}>
          Venha experimentar o melhor hambúrguer da cidade!
        </p>
      </div>
    </section>
  );
};

export default Home;
