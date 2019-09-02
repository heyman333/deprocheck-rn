import axios, { setAuthorization } from '../utils/axios';
export const requestMemberLoginByName = async (name: string) => {
  const { data } = await axios.post('/login', { name });
  setAuthorization(data.accessToken);
  return data;
};
