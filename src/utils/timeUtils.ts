import moment from 'moment';

export const toYYMMDDKR = (date: Date) =>
  moment.utc(date).format('YYYY년 MM월 DD일');

export const toAclockTime = (date: Date) => moment.utc(date).format('HH:00');
