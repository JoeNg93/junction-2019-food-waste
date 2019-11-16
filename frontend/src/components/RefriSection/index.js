import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import { StyleSheet, css } from 'aphrodite';
import { useHistory } from 'react-router-dom';
import style from "../../constants/styleVariables";
import FridgeContainer from './FridgeContainer';

const RegriSection = () => {
  let history = useHistory();
  return (
    <div className={css(styles.pageContainer)}>
      <div className={css(styles.content)}>
        <h1 className={css(styles.title)}>Your fridge</h1>
        <FridgeContainer />
      </div>
      <Icon
        className={css(styles.fixedFooter)}
        type="camera"
        onClick={() => history.push('/qr_scan')}
        style={{ fontSize: 50 }}
      />
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
    background: style.backgroundColor,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  title: {
    marginBottom: 32,
    color: style.primaryTextColor,
    fontWeight: 600
  },
  fixedFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    textAlign: 'center'
  }
});

export default RegriSection;
