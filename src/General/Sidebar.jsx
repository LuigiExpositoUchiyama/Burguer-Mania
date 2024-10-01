import React, { useState, useEffect } from 'react';
import styles from '../Styles/Sidebar.module.css';
import TrashIcon from '../Assets/Trash.svg';

const Sidebar = ({ onClose, isOpen, cart, setCart }) => {
  const [quantities, setQuantities] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false); // Estado para controle do pedido

  useEffect(() => {
    const initialQuantities = {};
    cart.forEach((item) => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  const handleIncrease = (id) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: prevQuantities[id] + 1,
    }));
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const handleDecrease = (id) => {
    setQuantities((prevQuantities) => {
      const newQuantity = prevQuantities[id] - 1;
      if (newQuantity < 1) {
        handleRemove(id);
        return { ...prevQuantities, [id]: 0 };
      }
      setCart(
        cart.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item,
        ),
      );
      return { ...prevQuantities, [id]: newQuantity };
    });
  };

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const handleFinalize = () => {
    setOrderSuccess(true);
  };

  const handleNewOrder = () => {
    setCart([]);
    setOrderSuccess(false);
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * quantities[item.id],
    0,
  );

  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={onClose}>
        X
      </button>
      <div className={styles.shop}>
        <h2>Carrinho de Compras</h2>
      </div>
      {orderSuccess ? (
        <div className={styles.content}>
          <div>
            <p className={styles.success}>
              Seu pedido foi concluído com sucesso!
            </p>
            <p className={styles.success}>
              Agradecemos pela sua escolha e esperamos que você aproveite cada
              mordida!
            </p>
            <button className={styles.newRequest} onClick={handleNewOrder}>
              Fazer Novo Pedido
            </button>
          </div>
        </div>
      ) : cart.length === 0 ? (
        <div className={styles.content}>
          <span className={styles.info}>
            Nenhum item adicionado ao carrinho!
          </span>
        </div>
      ) : (
        <div className={styles.contentCart}>
          <div className={styles.cart}>
            <p className={styles.img}></p>
            <p>PRODUTO</p>
            <p>PREÇO</p>
            <p>QT</p>
            <p>TOTAL</p>
            <p></p>
          </div>
          <div className={styles.burgers}>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.cartItemImage}
                />
                <p>{item.name}</p>
                <p>R$ {item.price.toFixed(2)}</p>
                <div className={styles.quantityControl}>
                  <button onClick={() => handleDecrease(item.id)}>-</button>
                  <p>{quantities[item.id]}</p>
                  <button onClick={() => handleIncrease(item.id)}>+</button>
                </div>
                <p>R${(item.price * quantities[item.id]).toFixed(2)}</p>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemove(item.id)}
                >
                  <img src={TrashIcon} alt="Remove" className={styles.trash} />
                </button>
              </div>
            ))}
          </div>
          <div className={styles.final}>
            <div>
              <div className={styles.subtotal}>
                <p>Subtotal: R${totalPrice.toFixed(2)}</p>
              </div>
              <div className={styles.frete}>
                <p>Frete: Grátis</p>
              </div>
              <div className={styles.total}>
                <p>Total: R${totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <div>
              <button
                className={styles.finalizeButton}
                onClick={handleFinalize}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
