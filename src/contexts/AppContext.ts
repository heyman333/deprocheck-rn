import React, { Dispatch } from 'react';

export type AactionType = 'CHANGE_THEME';

export interface Action {
  type: AactionType;
  payload: {
    theme: 'ADMIN' | 'MEMBER';
  };
}

export interface State {
  theme: 'ADMIN' | 'MEMBER';
  tabVisible: boolean;
}

export const initialState: State = {
  theme: 'MEMBER',
  tabVisible: true,
};

interface Context {
  state: State;
  dispatch: Dispatch<Action>;
}

const AppContext = React.createContext<Context>({
  state: initialState,
  dispatch: () => initialState,
});

export default AppContext;
