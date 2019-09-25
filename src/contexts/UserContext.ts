import React, { Dispatch } from 'react';

export type AactionType = 'SET_USER_INFO';

export interface LatLng {
  latitude: number;
  longitude: number;
}

export interface Action {
  type: AactionType;
  payload: {
    userInfo: {
      name?: string;
      sessionInfo?: {
        sessionLocation: LatLng;
        sessionAddress: string;
      };
    };
  };
}

export interface State {
  userInfo: {
    name?: string;
    sessionInfo?: {
      sessionLocation: LatLng;
      sessionAddress: string;
    };
  };
}

export const initialState: State = {
  userInfo: { name: '', sessionInfo: undefined },
};

interface Context {
  state: State;
  dispatch: Dispatch<Action>;
}

const UserContext = React.createContext<Context>({
  state: initialState,
  dispatch: () => initialState,
});

export default UserContext;
