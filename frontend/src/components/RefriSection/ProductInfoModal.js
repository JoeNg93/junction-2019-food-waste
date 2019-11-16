import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import style from '../../constants/styleVariables';

const ProductInfoModal = ({
  name,
  purchase_date,
  expired_date,
  suggestedExpDate
}) => {
  return (
    <div>
      <div className={css(styles.productImage)} />
      <h1 className={css(styles.productName)}>{name}</h1>
      <div>
        <div className={css(styles.sectionTitle)}>Ingredients:</div>
        <div className={css(styles.sectionValue)}>
          Lorem ipsum, dolor sit amet, consectetur adipiscing, elit, sed do,
          eiusmod tempor, incididunt.
        </div>
      </div>
      <div>
        <div className={css(styles.sectionTitle)}>Purchase date:</div>
        <div className={css(styles.sectionValue)}>{purchase_date}</div>
      </div>
      <div>
        <div className={css(styles.sectionTitle)}>{`${
          suggestedExpDate ? 'Suggested´' : ''
        } expiry date`}</div>
        <div className={css(styles.sectionValue)}>{expired_date}</div>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 3,
    background: style.primaryColor,
    margin: '16px auto',
  },
  productName: {
    marginBottom: 16,
    color: style.primaryTextColor,
    fontWeight: 600,
    textAlign: 'center'
  },
  sectionTitle: {
    color: style.primaryTextColor,
    fontWeight: 600,
    marginTop: 12
  },
  sectionValue: {}
});

export default ProductInfoModal;
