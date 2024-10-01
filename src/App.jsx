import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Routes/Home';
import Header from './General/Header';
import Footer from './General/Footer';
import Hamburguer from './Routes/Hamburguer';
import Sidebar from './General/Sidebar';

const App = () => {
  const [cart, setCart] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [burgers, setBurgers] = useState([]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const addToCart = (burger) => {
    const existingItem = cart.find((item) => item.id === burger.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === burger.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...burger, quantity: 1 }]);
    }
    setIsSidebarOpen(true);
  };

  useEffect(() => {
    fetch('https://my-burger-api.herokuapp.com/burgers')
      .then((response) => response.json())
      .then((data) => {
        const filteredBurgers = data.filter((burger) =>
          [0, 1, 2, 5, 9, 10, 11, 13].includes(burger.id),
        );
        setBurgers(filteredBurgers);
      })
      .catch((error) => console.error('Error fetching burgers:', error));
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header toggleSidebar={toggleSidebar} cart={cart} />
        <Sidebar
          onClose={toggleSidebar}
          isOpen={isSidebarOpen}
          cart={cart}
          setCart={setCart}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/hamburguer"
            element={<Hamburguer burgers={burgers} addToCart={addToCart} />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
