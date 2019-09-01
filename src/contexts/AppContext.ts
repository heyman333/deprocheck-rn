import React, { Dispatch } from 'react';

export type AactionType = 'change-theme';

export interface Action {
  type: AactionType;
  payload: {
    theme: string;
  };
}

export interface State {
  theme: string;
}

export const initialState: State = {
  theme: 'MEMBER',
};

interface Context {
  state: State;
  dispatch: Dispatch<Action>;
}

export const AppContext = React.createContext<Context>({
  state: initialState,
  dispatch: () => initialState,
});
