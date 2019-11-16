import React, { useState } from 'react';
import { Calendar, Badge } from 'antd';
import moment from 'moment';
import CalendarHeader from './CalendarHeader';

const data = {
  productName: 'Pringle',
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
};

const FrequencyCalendar = () => {
  const [value, setValue] = useState(moment(Date.now()));

  const getPurchaseQtyByDate = dateValue => {
    const date = dateValue.format('YYYY-MM-DD'),
      item = data.purchaseHistory.find(item => item.date === date);

    return item && item.qty;
  };

  const dateCellRender = value => {
    const purchaseQty = getPurchaseQtyByDate(value);
    return <Badge count={purchaseQty || 0} offset={[18, -20]} />;
  };

  const onPanelChange = value => {
    setValue(value);
  };

  return (
    <div>
      <Calendar
        fullscreen={false}
        value={value}
        onPanelChange={onPanelChange}
        dateCellRender={dateCellRender}
        headerRender={({ value, type, onChange }) => {
          return (
            <CalendarHeader
              value={value}
              type={type}
              onChange={onChange}
            />
          );
        }}
      />
    </div>
  );
};

export default FrequencyCalendar;
