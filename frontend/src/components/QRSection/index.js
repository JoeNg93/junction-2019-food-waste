import React, {useState, useEffect} from 'react';
import QrReader from 'react-qr-reader';
import { StyleSheet, css } from 'aphrodite';
import { Button, Icon, Modal } from 'antd'
import { useHistory } from 'react-router-dom'

const QRSection = () => {
  let history = useHistory();
  const [visible, setVisible] = useState(false);

  const handleScan = (data) => {
    if (data) {
      setVisible(true)
    }
  }

  const handleError = err => {
    console.error(err)
  }

  const handleCloseModal = () => {
    setVisible(false)
  }

  return (
    <>
      <div className={css(styles.ButtonContainer)}>
        <Button
          onClick={() => history.push('/')}
        >
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
          style={{height: '100%'}}
        />
      </div>
        <Modal
          title="Purchase History"
          visible={visible}
          footer={null}
          onCancel={handleCloseModal}
          style={{height: '100vh', top: 0}}
          bodyStyle={{height: '100vh'}}
          width={'100%'}
        >
          <p>Test</p>
        </Modal>
    </>
  )
}

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
    width: '100%',
  }
});

export default QRSection;