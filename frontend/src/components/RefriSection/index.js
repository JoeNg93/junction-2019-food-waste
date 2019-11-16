import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import { TiCamera } from 'react-icons/ti';
import { StyleSheet, css } from 'aphrodite';
import { useHistory } from 'react-router-dom';
import style from '../../constants/styleVariables';
import FridgeContainer from './FridgeContainer';

const RegriSection = () => {
  let history = useHistory();
  return (
    <div className={css(styles.pageContainer)}>
      <div className={css(styles.content)}>
        <h1 className={css(styles.title)}>Your fridge</h1>
        <FridgeContainer />
      </div>
      <div
        className={css(styles.cameraNavWrapper)}
        onClick={() => history.push('/qr_scan')}
      >
        <TiCamera
          style={{
            fontSize: 45,
            color: 'white',
            position: 'relative',
            top: -4
          }}
        />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 40,
    paddingLeft: 28,
    paddingRight: 28,
    background: style.backgroundColor
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%'
  },
  title: {
    marginBottom: 32,
    color: style.primaryTextColor,
    fontWeight: 600
  },
  cameraNavWrapper: {
    position: 'fixed',
    left: '50%',
    marginLeft: '-40px',
    bottom: -12,
    textAlign: 'center',
    width: 80,
    height: 80,
    borderRadius: '100%',
    background: style.primaryColor,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  }
});

export default RegriSection;
