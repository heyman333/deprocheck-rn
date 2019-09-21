import axios, { AxiosInstance } from 'axios';

const API_BASE_URL: string = 'https://check.depromeet.com/api';

let _instance: AxiosInstance | null = null;

function configureAxios() {
  if (_instance) {
    return _instance;
  }

  _instance = axios.create({
    baseURL: API_BASE_URL,
  });

  return _instance;
}

let _currentAuthorizationToken: string | null = null;

export const setAuthorization = (token: string | null) => {
  _currentAuthorizationToken = token;

  const instance = configureAxios();
  instance.defaults.headers.common.Authorization = token
    ? `Bearer ${token}`
    : '';
};

export function getAuthorizationToken() {
  return _currentAuthorizationToken;
}

export default configureAxios();
