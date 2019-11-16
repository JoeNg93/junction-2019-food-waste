import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import style from '../../constants/styleVariables';
import ProductCube from './ProductCube';

const FridgeShelf = ({ items, lastShelf, openProductInfoModal, removeProduct }) => {
  return (
    <div
      className={css(
        styles.fridgeShelfContainer,
        lastShelf && styles.lastShelf
      )}
    >
      {items &&
        items.map(({ id, name }) => (
          <ProductCube
            key={id}
            id={id}
            name={name}
            openProductInfoModal={openProductInfoModal}
            removeProduct={removeProduct}
          />
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
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    hyphens: 'auto',
    background: style.primaryColor,
    color: 'white',
    margin: '5px 6px',
    overflow: 'hidden'
  }
});

export default FridgeShelf;
