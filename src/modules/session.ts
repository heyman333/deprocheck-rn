import axios from '../utils/axios';
import { SessionInfo, AttendeeType } from '../interfaces';

export const createSession = async (sessionInfo: SessionInfo) => {
  const { data } = await axios.post('/admin/sessions', sessionInfo);
  return data;
};

export const getAttendances = async (): Promise<AttendeeType[]> => {
  const { data } = await axios.get('/admin/attendances');
  return data;
};
