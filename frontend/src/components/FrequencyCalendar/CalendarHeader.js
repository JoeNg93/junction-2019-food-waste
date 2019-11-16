import React, { useState } from 'react';
import { Row, Icon } from 'antd';

const CalendarHeader = ({ value, type, onChange, focusToday, renderPurchaseMessage }) => {
    const current = value.clone(),
        localeData = value.localeData();

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
        <div style={{ padding: 10 }}>
            <Row>
                <span>{renderPurchaseMessage(value)}</span>
            </Row>
            <Row type="flex" justify="space-between">
                <Icon type="left" onClick={onPrev} />
                <span>{month + 1}</span>
                <span>{year}</span>
                <Icon type="right" onClick={onNext} />
            </Row>
            <Row>
                <span onClick={focusToday}>Today</span>
            </Row>
        </div>
    );
};

export default CalendarHeader