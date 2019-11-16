import React, {useState} from 'react';
import { Table } from 'antd';
import { DatePicker } from 'antd';
import moment from 'moment';


const ReceiptContent = ({productList, selectProducts}) => {

  const [productsExpiryDate, setProductExpiryDate] = useState(productList.map(product => {
    return {
      ean: product.ean,
      expired_date: '2019-11-16'
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
                                          defaultValue={moment(expired_date, dateFormat)}
                                          format={dateFormat}
                                          onChange={(ean, ...theArgs) => expireDateChange}
                                        />
    }
  ];

  const expireDateChange = (ean, date, dateString) => {
    console.log(ean)
    console.log(dateString)
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const selectedRowsFormatted = selectedRows.map(row => {
        return {
          ean: row.ean,
          purchase_date: row.purchase_date,
          name: row.name,
          quantity: row.quantity,
          expired_date: moment(row.expired_date).format(dateFormat)
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
        expired_date: '2019-11-16'
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