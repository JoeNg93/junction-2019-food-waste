import React, { useState } from 'react';
import { Row, Icon } from 'antd';
import { StyleSheet, css } from 'aphrodite';
import style from '../../constants/styleVariables';

const CalendarHeader = ({
  value,
  type,
  onChange,
  focusToday,
  renderPurchaseMessage
}) => {
  const [month, setMonth] = useState(value.month());
  const [year, setYear] = useState(value.year());

  const onPrev = () => {
      const newValue = value.clone();
      newValue.subtract(1, 'month');
      setMonth(newValue.month());
      setYear(newValue.year());
      onChange(newValue);
    },
    onNext = () => {
      const newValue = value.clone();
      newValue.add(1, 'month');
      setMonth(newValue.month());
      setYear(newValue.year());
      onChange(newValue);
    };

  return (
    <div className={css(styles.headerWrapper)}>
      <Row type="flex" align="center">
        <span className={css(styles.purchaseMessage)}>
          {renderPurchaseMessage(value)}
        </span>
      </Row>
      <Row className={css(styles.navRow)} type="flex" justify="space-between">
        <Icon type="left" onClick={onPrev} />
        <span>{month + 1}</span>
        <span>{year}</span>
        <Icon type="right" onClick={onNext} />
      </Row>
      <Row className={css(styles.todayRow)} type="flex" align="center">
        <span className={css(styles.todayHelper)} onClick={focusToday}>
          Today
        </span>
      </Row>
    </div>
  );
};
const styles = StyleSheet.create({
  headerWrapper: {
    paddingTop: 16
  },
  navRow: {
    margin: 16
  },
  purchaseMessage: {
    fontSize: 20,
    color: style.primaryColor,
    textAlign: 'center'
  },
  todayHelper: {
    textDecoration: 'underline',
    cursor: 'pointer',
    color: 'white'
  },
  todayRow: {
    background: style.primaryColor,
    padding: 4
  }
});

export default CalendarHeader;
