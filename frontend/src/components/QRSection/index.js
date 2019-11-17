import React, { useState } from 'react';
import QrReader from 'react-qr-reader';
import { StyleSheet, css } from 'aphrodite';
import { Button, Icon, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import FrequencyCalendar from '../../components/FrequencyCalendar';
import ReceiptContent from '../../components/ReceiptContent/index';
import style from '../../constants/styleVariables';

const mockData = [
  {
    name: 'Tölkkipantti 0,15 eur kaikki koot',
    ean: '2000973900008',
    quantity: 10,
    purchase_date: '2019-01-30/18'
  },
  {
    name: 'Bonus savuketupakka 30g Vaalea Klassikko',
    ean: '6410105909063',
    quantity: 2,
    purchase_date: '2019-01-30/18'
  }
];
const QRSection = () => {
  let history = useHistory();
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [purchaseHistoryVisible, setPurchaseHistoryVisible] = useState(false);
  const [purchaseHistoryData, setPurchaseHistoryData] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleScan = async data => {
    if (data) {
      let dataObj = JSON.parse(data);
      if (dataObj.type === 'receipt') {
        const receiptRes = await axios.get(
          `/receipts/${dataObj.result}?storeId=${dataObj.storeId}`
        );
        setReceiptVisible(true);
        setReceiptData(receiptRes.data);
      } else {
        const productPurchaseHistoryRes = await axios.get(
          `/purchase-history/${dataObj.result}?storeId=${dataObj.storeId}`
        );
        setPurchaseHistoryVisible(true);
        setPurchaseHistoryData(productPurchaseHistoryRes.data);
      }
    }
  };

  const handleError = err => {
    console.error(err);
  };

  const handleConfirmReceiptModal = async () => {
    const postFridgeRes = await axios.post('/fridge', {
      products: selectedProducts
    });
    setSelectedProducts([]);
    history.push('/');
  };

  const handleCloseReceiptModal = () => {
    setReceiptData(null);
    setReceiptVisible(false);
  };

  const handleClosePHModal = () => {
    setPurchaseHistoryData(null);
    setPurchaseHistoryVisible(false);
  };

  return (
    <div className={css(styles.pageContainer)}>
      <div className={css(styles.header)}>
        <Button
          onClick={() => history.push('/')}
          style={{ border: 'none', background: 'transparent', color: 'white' }}
        >
          <Icon type="left" style={{ fontSize: 18 }} />
          <span style={{ fontSize: 18, fontWeight: 600 }}>Back</span>
        </Button>
      </div>
      <p className={css(styles.instructions)}>
        Scan your bill or product QR code to keep track of your purchases.
      </p>
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
        centered
        width={'100%'}
      >
        {purchaseHistoryData && (
          <>
            <FrequencyCalendar purchaseHistoryData={purchaseHistoryData} />
          </>
        )}
      </Modal>
      <Modal
        title={'Receipt'}
        visible={receiptVisible}
        onCancel={handleCloseReceiptModal}
        onOk={handleConfirmReceiptModal}
        style={{ height: '100vh', top: 0 }}
        bodyStyle={{ height: '80vh', overflow: 'scroll' }}
        width={'100%'}
      >
        {receiptData && (
          <>
            <ReceiptContent
              selectProducts={selectedProducts =>
                setSelectedProducts(selectedProducts)
              }
              productList={receiptData}
            />
          </>
        )}
      </Modal>
      <div className={css(styles.footer)} />
    </div>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    background: style.backgroundColor,
    height: '100%'
  },
  header: {
    top: 0,
    height: 52,
    width: '100%',
    padding: '10px 6px',
    background: style.primaryColor
  },
  instructions: {
    textAlign: 'center',
    width: '80%',
    margin: 'auto',
    marginTop: 20
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: 50,
    width: '100%',
    background: style.primaryColor
  },
  QrContainer: {
    height: 'calc(100% - 200px)',
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center'
  },
  QrReader: {
    height: '100%',
    width: '100%',
    maxHeight: 500,
    maxWidth: 500,
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center'
  }
});

export default QRSection;
