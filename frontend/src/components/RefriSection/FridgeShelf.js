import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';

const FridgeShelf = ({ items, hasBorder }) => {
  return (
    <div
      className={css(
        styles.fridgeShelfContainer,
        hasBorder && styles.shelfBorder
      )}
    >
      {items &&
        items.map(({ productName }) => (
          <div className={css(styles.productCube)}>{productName}</div>
        ))}
    </div>
  );
};

const styles = StyleSheet.create({
  fridgeShelfContainer: {
    background: '#f8f8f8',
    flex: 1,
    padding: 20,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  shelfBorder: {
    borderBottom: '1px solid #d8d8d8'
  },
  productCube: {
    width: 50,
    height: 50,
    borderRadius: 6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default FridgeShelf;
