import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import style from '../../constants/styleVariables';

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
    alignItems: 'center',
    justifyContent: 'center'
  },
  shelfBorder: {
    borderBottom: '1px solid #d8d8d8'
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
    marginRight: 12,
    marginBottom: 10
  }
});

export default FridgeShelf;
