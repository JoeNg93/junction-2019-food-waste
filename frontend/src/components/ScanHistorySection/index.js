import React, { useState } from 'react';
import { List, Avatar, Modal } from 'antd';
import { css, StyleSheet } from 'aphrodite';
import style from '../../constants/styleVariables';
import FrequencyCalendar from '../FrequencyCalendar/index';

const data = [
  {
    productName: 'Pirkka pizzasuikale 250g',
    image: 'pizza.jpeg',
    purchaseHistory: [
      {
        date: '2019-10-23',
        qty: 4
      },
      {
        date: '2019-11-11',
        qty: 2
      },
      {
        date: '2019-11-06',
        qty: 3
      }
    ]
  },
  {
    productName: 'Pirkka tomaattisose 70g',
    image: 'tomato.jpeg',
    purchaseHistory: [
      {
        date: '2019-10-23',
        qty: 4
      },
      {
        date: '2019-11-11',
        qty: 3
      },
      {
        date: '2019-11-06',
        qty: 5
      }
    ]
  },
];
const ScanHistorySection = () => {
  const [purchaseHistoryVisible, setPurchaseHistoryVisible] = useState(false);
  const [purchaseHistoryData, setPurchaseHistoryData] = useState(null);

  const handleClosePHModal = () => {
    setPurchaseHistoryData(null);
    setPurchaseHistoryVisible(false);
  };

  return (
    <div className={css(styles.container)}>
      <h1 className={css(styles.title)}>Scan History</h1>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={item => (
          <List.Item
            onClick={() => {
              setPurchaseHistoryVisible(true);
              setPurchaseHistoryData(item);
            }}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  size={60}
                  style={{borderRadius: 4, border: '1px solid #dddddd'}}
                  src={require(`../../assets/${item.image}`)}
                />
              }
              title={<h3 style={{ paddingTop: 20 }}>{item.productName}</h3>}
            />
          </List.Item>
        )}
      />
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
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 70,
    paddingTop: 30,
    paddingLeft: 28,
    paddingRight: 28
  },
  title: {
    marginBottom: 32,
    color: style.primaryTextColor,
    fontWeight: 600,
  }
});

export default ScanHistorySection;
