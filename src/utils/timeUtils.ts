import moment from 'moment';

export const toYYMMDDKR = (date: Date) =>
  moment.utc(date).format('YYYY년 MM월 DD일');

export const toFullTimeKR = (date: Date) =>
  moment.utc(date).format('YYYY년 MM월 DD일 hh시 mm분 ss초');

export const toAclockTime = (date: Date) => moment.utc(date).format('HH:00');
