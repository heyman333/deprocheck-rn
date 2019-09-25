import axios from '../utils/axios';
import { SessionInfo, AttendeeType } from '../interfaces';
import AppConfig from 'react-native-config';

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
  console.log('formattedAddress', formattedAddress);

  return formattedAddress;
};
