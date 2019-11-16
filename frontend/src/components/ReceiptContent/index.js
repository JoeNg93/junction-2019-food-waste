import React, {useState} from 'react';
import { Table } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';


const ReceiptContent = ({productList, selectProducts}) => {

  const [productsExpiryDate, setProductExpiryDate] = useState(productList.map(product => {
    return {
      ean: product.ean,
      expired_date: ''
    }
  }))

  const dateFormat = 'YYYY-MM-DD';
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      width: '13%',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expired_date',
      render: ({ean, expired_date}) =>  <DatePicker
                                          format={dateFormat}
                                          onChange={(...dateArgs) => expireDateChange(ean, ...dateArgs)}
                                        />
    }
  ];

  const expireDateChange = (ean, ...dateArgs) => {
    const dateString = dateArgs[1];
    let productsExpiryDateClone = [...productsExpiryDate]
    productsExpiryDateClone = productsExpiryDateClone.map(product => {
      if (product.ean === ean) {
        product.expired_date = dateString;
      }
      return product;
    })
    setProductExpiryDate(productsExpiryDateClone)
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const selectedRowsFormatted = selectedRows.map(row => {
        return {
          ean: row.ean,
          purchase_date: row.purchase_date,
          name: row.name,
          quantity: row.quantity,
          expired_date: productsExpiryDate.find(product => product.ean === row.ean).expired_date
        }
      })
      selectProducts(selectedRowsFormatted)
    },
  };

  const data = productList.map(product => {
    return {
      key: product.ean,
      ean: product.ean,
      purchase_date: product.purchase_date,
      name: product.name,
      quantity: product.quantity,
      expired_date: {
        ean: product.ean,
        expired_date: product.expired_date
      }
    };
  });
  return (
    <>
      <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={data} />
    </>
  )
}

export default ReceiptContent;