import React, { useReducer } from 'react';
import {
  AactionType,
  AppContext,
  State,
  initialState,
} from '../contexts/AppContext';

const AppConsumer = AppContext.Consumer;

interface Action {
  type: AactionType;
  payload: {
    theme: string;
  };
}

interface Props {
  children?: any;
}

export interface State {
  theme: string;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'change-theme':
      return {
        ...state,
        theme: action.payload.theme,
      };
    default:
      return state;
  }
};

function AppProvider(props: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  console.log('!', value);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

export { AppConsumer, AppProvider, AppContext };
