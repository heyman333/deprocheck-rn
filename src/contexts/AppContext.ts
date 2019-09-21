import React from 'react';

export type AactionType = 'CHANGE_THEME' | 'SET_TAB_VISIBLE';

export interface Action {
  type: AactionType;
  payload: any;
}

export interface State {
  theme: 'ADMIN' | 'MEMBER';
  tabVisible: boolean;
}

export const initialState: State = {
  theme: 'MEMBER',
  tabVisible: false,
};

// FIXME: dispatch type 정의
const empty = (action: Action) => {
  console.log(action);
};

const AppContext = React.createContext({
  state: initialState,
  dispatch: (action: Action) => empty(action),
});

export default AppContext;
