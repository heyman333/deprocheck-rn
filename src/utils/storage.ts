import AsyncStorage from '@react-native-community/async-storage';

const USER_INFO_KEY = 'USER_INFO_KEY';

enum JobType {
  DEVELOPER = 'DEVELOPER',
  DESIGNER = 'DESIGNER',
}

interface StoredUserInfoType {
  name: string;
  mode: 'ADMIN' | 'MEMBER';
  jobType: JobType;
}

export const storeUserInfo = (storedUserInfo: StoredUserInfoType) => {
  AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(storedUserInfo));
};

export const getUserInfo = async (): Promise<StoredUserInfoType | null> => {
  const userInfo = await AsyncStorage.getItem(USER_INFO_KEY);
  if (userInfo) {
    return JSON.parse(userInfo);
  }
  return null;
};
