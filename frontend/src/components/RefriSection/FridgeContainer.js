import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import FridgeShelf from './FridgeShelf';
import data from './mockData';

const FridgeContainer = ({ shelfCapacity = 2, numberOfShelf = 3 }) => {
  const renderFridgeShelf = () => {
    const products = [...data];

    return Array.from({length: numberOfShelf}, (el, idx) => {
      if (idx === numberOfShelf - 1) {
        return <FridgeShelf items={products} />
      }

      return <FridgeShelf items={products.splice(0, shelfCapacity)} hasBorder />
    })
  };

  return (
    <div className={css(styles.fridgeContainer)}>
      {renderFridgeShelf()}
    </div>
  );
};

const styles = StyleSheet.create({
  fridgeContainer: {
    height: '70%',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #d8d8d8',
    borderRadius: 3
  }
});

export default FridgeContainer;
