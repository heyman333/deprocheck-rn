import axios from '../utils/axios';
import { AttendRequest } from '../interfaces';

export const reqeustAttend = async (sessionInfo: AttendRequest) => {
  const { data } = await axios.post('/members/me/attend', sessionInfo);
  return data;
};
