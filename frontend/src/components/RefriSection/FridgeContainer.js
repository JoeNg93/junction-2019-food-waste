import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Modal } from 'antd';
import FridgeShelf from './FridgeShelf';
import style from '../../constants/styleVariables';
import axios from 'axios';
import ProductInfoModal from './ProductInfoModal';
import _ from 'lodash';

const fetchFridgeProducts = async () => {
  const fridgeProductsRes = await axios({ method: 'GET', url: '/fridge' });
  return fridgeProductsRes.data;
};

const FridgeContainer = ({ shelfCapacity = 8, numberOfShelf = 3 }) => {
  const [fridgeProducts, setFridgeProducts] = useState([]);
  const [idxFridgeProducts, setIdxFridgeProducts] = useState({});
  const [productInfoModalVisible, setProductInfoModalVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

  // Fetch all products in fridge after mount
  useEffect(() => {
    fetchFridgeProducts().then(products => {
      setFridgeProducts(products);
      setIdxFridgeProducts(_.groupBy(products, 'id'));
    });
  }, []);

  const openProductInfoModal = id => {
    setProductInfoModalVisible(true);
    setCurrentProduct(idxFridgeProducts[id] ? idxFridgeProducts[id][0] : {});
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

  const updateProducts = (updatedProducts) => {
    setFridgeProducts(updatedProducts);
    setIdxFridgeProducts(_.groupBy(updatedProducts, 'id'));
  }

  return (
    <div className={css(styles.fridgeVisualWrapper)}>
      <div className={css(styles.fridgeContainer)}>{renderFridgeShelf()}</div>
      <Modal
        title={'Product Info'}
        visible={productInfoModalVisible}
        onCancel={closeProductInfoModal}
        centered
        footer={null}
        width={'100%'}
      >
        <ProductInfoModal key={currentProduct.id} {...currentProduct} updateProducts={updateProducts}/>
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
