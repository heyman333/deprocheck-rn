import axios from '../utils/axios';
import { SessionInfo } from '../interfaces';

export const createSession = async (sessionInfo: SessionInfo) => {
  const { data } = await axios.post('/admin/sessions', sessionInfo);

  return data;
};
