import React, {useState, useEffect} from 'react';
import QrReader from 'react-qr-reader';
import { StyleSheet, css } from 'aphrodite';
import { Button, Icon } from 'antd'
import { useHistory } from 'react-router-dom'

const QRSection = () => {
  let history = useHistory();
  const [result, setResult] = useState('')

  const handleScan = (data) => {
    if (data) {
      setResult(data)
    }
  }

  const handleError = err => {
    console.error(err)
  }

  return (
    <>
    <Button
      type="primary"
      onClick={() => history.push('/')}
    >
      <Icon type="left" />
        Go back
    </Button>
    <div className={css(styles.QrContainer)}>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        className={css(styles.QrReader)}
        style={{height: '100%'}}
      />
    </div>
    </>
  )
}

const styles = StyleSheet.create({
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