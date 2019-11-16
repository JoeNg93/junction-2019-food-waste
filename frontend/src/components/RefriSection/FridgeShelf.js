import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import style from '../../constants/styleVariables';

const FridgeShelf = ({ items, lastShelf }) => {
  return (
    <div
      className={css(
        styles.fridgeShelfContainer,
        lastShelf && styles.lastShelf
      )}
    >
      {items &&
        items.map(({ productName }, idx) => (
          <div key={idx} className={css(styles.productCube)}>
            {productName}
          </div>
        ))}
    </div>
  );
};

const styles = StyleSheet.create({
  fridgeShelfContainer: {
    background: '#fff',
    flex: 1,
    padding: 12,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    border: `1px solid ${style.primaryColor}`,
    borderRadius: 6
  },
  lastShelf: {
    borderBottomWidth: 2
  },
  productCube: {
    width: 60,
    height: 60,
    padding: 6,
    borderRadius: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: style.primaryColor,
    color: 'white',
    margin: '5px 6px',
  }
});

export default FridgeShelf;
