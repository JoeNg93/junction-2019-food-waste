import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import FridgeShelf from './FridgeShelf';
import style from '../../constants/styleVariables';
import axios from 'axios';

const fetchFridgeProducts = async () => {
  const fridgeProductsRes = await axios({ method: 'GET', url: '/fridge' });
  return fridgeProductsRes.data;
};

const FridgeContainer = ({ shelfCapacity = 8, numberOfShelf = 3 }) => {
  const [fridgeProducts, setFridgeProducts] = useState([]);

  // Fetch all products in fridge after mount
  useEffect(() => {
    fetchFridgeProducts().then(products => setFridgeProducts(products));
  }, []);

  const renderFridgeShelf = () => {
    const products = [...fridgeProducts];

    return Array.from({ length: numberOfShelf }, (el, idx) => {
      if (idx === numberOfShelf - 1) {
        return <FridgeShelf key={idx} items={products} lastShelf />;
      }

      return (
        <FridgeShelf
          key={idx}
          items={products.splice(0, shelfCapacity)}
          hasBorder
        />
      );
    });
  };

  return (
    <div className={css(styles.fridgeVisualWrapper)}>
      <div className={css(styles.fridgeContainer)}>{renderFridgeShelf()}</div>
    </div>
  );
};

const styles = StyleSheet.create({
  fridgeVisualWrapper: {
    height: '75%',
    padding: 20,
    background: '#f5f5f5',
    border: `2px solid ${style.primaryColor}`,
    borderRadius: 6
  },
  fridgeContainer: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column'
  }
});

export default FridgeContainer;
