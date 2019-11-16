import React, { useState, useEffect } from 'react';
import QrReader from 'react-qr-reader';
import { StyleSheet, css } from 'aphrodite';
import { Button, Icon, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import FrequencyCalendar from '../../components/FrequencyCalendar';

const QRSection = () => {
  let history = useHistory();
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [purchaseHistoryVisible, setPurchaseHistoryVisible] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [purchaseHistoryData, setPurchaseHistoryData] = useState(null);

  const handleScan = async data => {
    if (data) {
      let dataObj = JSON.parse(data);
      if (dataObj.type === 'receipt') {
        // const receiptRes = await axios.get(`/receipt/${dataObj.result}`)
        // setReceiptVisible(true)
        // setReceiptData(receiptRes.data)
        setReceiptVisible(true)
        setReceiptData('abc')

      } else {
        // const productPurchaseHistoryRes = await axios.get(`/products/${dataObj.result}/purchase-history`)
        // setPurchaseHistoryVisible(true)
        // setPurchaseHistoryData(productPurchaseHistoryRes.data)
        setPurchaseHistoryVisible(true)
        setPurchaseHistoryData('abc')
      }
    }
  };

  const handleError = err => {
    console.error(err);
  };

  const handleConfirmReceiptModal = () => {
    history.push('/');
  };

  const handleCloseReceiptModal = () => {
    setReceiptData(null);
    setReceiptVisible(false);
  };

  const handleClosePHModal = () => {
    setReceiptData(null);
    setPurchaseHistoryVisible(false);
  };

  return (
    <div>
      <div className={css(styles.ButtonContainer)}>
        <Button onClick={() => history.push('/')}>
          <Icon type="left" />
          Back
        </Button>
      </div>
      <div className={css(styles.QrContainer)}>
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          className={css(styles.QrReader)}
          style={{ height: '100%' }}
        />
      </div>
      <Modal
        title={'Purchase History'}
        visible={purchaseHistoryVisible}
        footer={null}
        onCancel={handleClosePHModal}
        style={{ height: '100vh', top: 0 }}
        bodyStyle={{ height: '100vh' }}
        width={'100%'}
      >
        {purchaseHistoryData && (
          <>
            <FrequencyCalendar />
          </>
        )}
      </Modal>
      <Modal
        title={'Receipt'}
        visible={receiptVisible}
        onCancel={handleCloseReceiptModal}
        onOk={handleConfirmReceiptModal}
        style={{ height: '100vh', top: 0 }}
        bodyStyle={{ height: '100vh' }}
        width={'100%'}
      >
        {receiptData && <h1>This is receipt data</h1>}
      </Modal>
    </div>
  );
};

const styles = StyleSheet.create({

  ButtonContainer: {
    top: 30
  },
  QrContainer: {
    height: '100%',
    position: 'relative',
    top: 100,
    bottom: 20
  },
  QrReader: {
    height: '100%',
    width: '100%'
  }
});

export default QRSection;
