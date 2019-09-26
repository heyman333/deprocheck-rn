import AppConfig from 'react-native-config';
import _last from 'lodash/last';

import axios from '../utils/axios';
import { SessionInfo, AttendeeType, SessionInfoResponse } from '../interfaces';

const GEOCODE_KEY: string = AppConfig.GEOCODE_API_KEY;

export const createSession = async (sessionInfo: SessionInfo) => {
  const { data } = await axios.post('/admin/sessions', sessionInfo);
  return data;
};

export const getAttendances = async (date: string): Promise<AttendeeType[]> => {
  const { data } = await axios.get('/admin/attendances', {
    params: {
      date,
    },
  });
  return data;
};

export const getAddress = async (lat: number, lng: number) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${lat},${lng}&key=${GEOCODE_KEY}&language=ko`;
  const {
    data: { results },
  } = await axios.get(url);

  const formattedAddress = results[1].formatted_address;

  return formattedAddress;
};

export const getSessionInfos = async (): Promise<
  SessionInfoResponse | undefined
> => {
  const { data } = await axios.get('/sessions');
  const lastSession: SessionInfoResponse | undefined = _last(data);

  return lastSession;
};
