import React from 'react';
import { Table } from 'antd';


const ReceiptContent = ({productList, selectProducts}) => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      const selectedRowsFormatted = selectedRows.map(row => {
        return {
          ean: row.ean,
          purchase_date: row.purchase_date,
          name: row.name,
          quantity: row.quantity,
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
    };
  });
  return (
    <>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </>
  )
}

export default ReceiptContent;