import AsyncStorage from '@react-native-community/async-storage';

const USER_INFO_KEY = 'USER_INFO_KEY';

enum JobType {
  DEVELOPER,
  DESGINER,
}

interface StoredUserInfoType {
  name: string;
  job?: JobType;
  mode: 'ADMIN' | 'MEMBER';
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
