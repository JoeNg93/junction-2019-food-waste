import React, { useState } from 'react';
import { Calendar, Badge } from 'antd';
import moment from 'moment';

const FrequencyCalendar = () => {
  const [value, setValue] = useState(moment(Date.now()));

  const dateCellRender = () => {
    return <Badge count={3} offset={[18, -20]} />;
  };

  const onPanelChange = value => {
    setValue(value);
  };

  return (
    <div>
      <Calendar
        fullscreen={false}
        value={value}
        onSelect={null}
        onPanelChange={onPanelChange}
        dateCellRender={dateCellRender}
      />
    </div>
  );
};
export default FrequencyCalendar;
