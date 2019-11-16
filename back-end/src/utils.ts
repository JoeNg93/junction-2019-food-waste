import moment from 'moment';

export const newId = (): string => {
    const chars =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
        autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (autoId.length !== 20) {
        throw new Error('Invalid auto ID: ' + autoId);
    }
    return autoId;
};

export const suggestDeffaultExpDate = (purchase_date: string) =>
    moment(purchase_date.split('/')[0])
        .add(Math.round(Math.random() * 5 + 5), 'days')
        .format('YYYY-MM-DD');
