import React, { Dispatch } from 'react';

export type AactionType = 'SET_USER_INFO';

export interface Action {
  type: AactionType;
  payload: {
    userInfo: {
      name: string;
    };
  };
}

export interface State {
  userInfo: { name: string };
}

export const initialState: State = {
  userInfo: { name: '' },
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
