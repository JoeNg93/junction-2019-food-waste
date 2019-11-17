import React, { useState, useEffect } from 'react';
import { StyleSheet, css } from 'aphrodite';
import style from '../../constants/styleVariables';
import { DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';

const noImages = [
  "6407810010160",
  "6409100054243",
  "6413466116101",
  "6419800020837",
  "2000973900008",
  "6410105909063",
  "6430041692775",
];

const ProductInfoModal = ({
  name,
  id,
  ean,
  purchase_date,
  expired_date,
  suggestedExpDate,
  updateProducts
}) => {
  const noImages = [];

  const dateFormat = 'YYYY-MM-DD',
    imageLink = 'https://k-file-storage-qa.imgix.net/f/k-ruoka/product/',
    imageSrc = noImages[ean]
      ? require(`../../assets/product-placeholder.jpg`)
      : imageLink + ean;

  const [expiryDate, setExpiryDate] = useState(expired_date);
  const expireDateChange = async (date, dateString) => {
    const expiryDateChangeRes = await axios.patch(`/fridge/${id}`, {
      expired_date: dateString,
      suggestedExpDate: false
    });
    setExpiryDate(dateString);
    updateProducts(expiryDateChangeRes.data);
  };
  return (
    <div>
      <div className={css(styles.productImageWrapper)}>
        <img
          src={imageSrc}
          className={css(styles.productImage)}
        />
      </div>
      <h1 className={css(styles.productName)}>{name}</h1>
      <div>
        <div className={css(styles.sectionTitle)}>Ingredients:</div>
        <div className={css(styles.sectionValue)}>
          Lorem ipsum, dolor sit amet, consectetur adipiscing, elit, sed do,
          eiusmod tempor, incididunt.
        </div>
      </div>
      <div>
        <div className={css(styles.sectionTitle)}>Purchase date:</div>
        <div className={css(styles.sectionValue)}>
          {purchase_date.split('/')[0]}
        </div>
      </div>
      <div>
        <div className={css(styles.sectionTitle)}>{`${
          suggestedExpDate ? 'Suggested expiry' : 'Expiry'
        } date`}</div>
        <div className={css(styles.sectionValue)}>
          <DatePicker
            value={moment(expiryDate, dateFormat)}
            format={dateFormat}
            onChange={expireDateChange}
            style={{ marginTop: 10, marginBottom: 20 }}
          />
        </div>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  productImage: {
    width: '100%'
  },
  productImageWrapper: {
    width: 150,
    height: 150,
    borderRadius: 4,
    margin: '0 auto 24px'
  },
  productName: {
    marginBottom: 16,
    color: style.primaryTextColor,
    fontWeight: 600,
    textAlign: 'center'
  },
  sectionTitle: {
    color: style.primaryTextColor,
    fontWeight: 600,
    marginTop: 12
  },
  sectionValue: {}
});

export default ProductInfoModal;
