import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import { TiCamera } from 'react-icons/ti';
import { StyleSheet, css } from 'aphrodite';
import { useHistory } from 'react-router-dom';
import style from '../../constants/styleVariables';
import FridgeContainer from './FridgeContainer';

const RegriSection = () => {
  let history = useHistory();

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const requestNotificationPermission = async () => {
    // Some browsers don't support Notification yet. I'm looking at you iOS Safari
    if ("Notification" in window) {
      if (
        Notification.permission !== "denied" &&
        Notification.permission !== "granted"
      ) {
        Notification.requestPermission();
      }
    }
  };

  const sendPushNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      setTimeout(new Notification("Your milk will be expired today!"), 5000);
    }
  };

  return (
    <div className={css(styles.pageContainer)}>
      <div className={css(styles.content)}>
        <div className={css(styles.titleContainer)}>
          <h1 className={css(styles.title)}>Your fridge</h1>
          <div className={css(styles.invisibleBtn)} onClick={sendPushNotification}/>
        </div>
        <FridgeContainer />
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  invisibleBtn: {
    height: 42,
    width: 80,
  },
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
