import moment from 'moment';

export const toYYMMDDKR = (date: Date) =>
  moment(date).format('YYYY년 MM월 DD일');

export const toFullTimeKR = (date: string) =>
  moment(date)
    .add(9, 'h')
    .format('YYYY년 MM월 DD일 HH시 mm분 ss초');

export const toAclockTime = (date: Date) => moment(date).format('HH:00');

export const toYYYYMMDD = (date: Date) => moment(date).format('YYYY-MM-DD');

export const toIOSString = (date: Date) =>
  moment(date)
    .add(9, 'h')
    .toISOString();
