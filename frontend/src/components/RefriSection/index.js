import React,  { useState, useEffect } from 'react';
import { Icon } from 'antd';
import { StyleSheet, css } from 'aphrodite';
import {
  useHistory
} from "react-router-dom";

const RegriSection = () => {
  let history = useHistory();
  return (
    <div>
      <h1>This is refri section</h1>
      <Icon
        className={css(styles.fixedFooter)}
        type="camera"
        onClick={() => history.push("/qr_scan")}
        style={{fontSize: 50}}
      />
    </div>
  )
}

const styles = StyleSheet.create({
  fixedFooter: {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
    textAlign: 'center',
  }
});

export default RegriSection;