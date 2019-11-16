import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Modal } from 'antd';
import FridgeShelf from './FridgeShelf';
import style from '../../constants/styleVariables';
import axios from 'axios';

const fetchFridgeProducts = async () => {
  const fridgeProductsRes = await axios({ method: 'GET', url: '/fridge' });
  return fridgeProductsRes.data;
};

const FridgeContainer = ({ shelfCapacity = 8, numberOfShelf = 3 }) => {
  const [fridgeProducts, setFridgeProducts] = useState([]);
  const [productInfoModalVisible, setProductInfoModalVisible] = useState(false);

  // Fetch all products in fridge after mount
  useEffect(() => {
    fetchFridgeProducts().then(products => setFridgeProducts(products));
  }, []);

  const openProductInfoModal = () => {
    setProductInfoModalVisible(true);
  };

  const closeProductInfoModal = () => {
    setProductInfoModalVisible(false);
  };

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
          openProductInfoModal={openProductInfoModal}
          hasBorder
        />
      );
    });
  };

  return (
    <div className={css(styles.fridgeVisualWrapper)}>
      <div className={css(styles.fridgeContainer)}>{renderFridgeShelf()}</div>
      <Modal
        title={'Product Info'}
        visible={productInfoModalVisible}
        onCancel={closeProductInfoModal}
        style={{ height: '100vh', top: 0 }}
        bodyStyle={{ height: '100vh' }}
        width={'100%'}
      >
      </Modal>
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
