import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import style from '../../constants/styleVariables';

const FridgeShelf = ({ items, lastShelf, openProductInfoModal }) => {
  return (
    <div
      className={css(
        styles.fridgeShelfContainer,
        lastShelf && styles.lastShelf
      )}
    >
      {items &&
        items.map(({ id, name }) => (
          <div
            key={id}
            className={css(styles.productCube)}
            onClick={() => openProductInfoModal(id)}
          >
            {name}
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
    margin: '5px 6px'
  }
});

export default FridgeShelf;
