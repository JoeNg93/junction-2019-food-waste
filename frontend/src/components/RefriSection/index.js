import React, { useState, useEffect } from 'react';
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

  const sendPushNotification = ()  => {
    navigator.serviceWorker.register('./sw.js');
    Notification.requestPermission(function(result) {
      if (result === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
          setTimeout(registration.showNotification('Your milk will be expired today!', {
            body: 'Eat me first plss!',
            icon: './logo.png',
            vibrate: [200, 100, 200, 100, 200, 100, 200],
            tag: 'vibration-sample'
          }), 5000);
        });
      }
    })
  };

  return (
    <div className={css(styles.pageContainer)}>
      <div className={css(styles.content)}>
        <div className={css(styles.titleContainer)}>
          <h1 className={css(styles.title)}>Your fridge</h1>
          <div className={css(styles.invisibleBtn)} onClick={sendPushNotification} />
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
    width: 160,
  },
  pageContainer: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 30,
    paddingLeft: 28,
    paddingRight: 28,
    background: style.backgroundColor,
    overflow: 'hidden',
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
