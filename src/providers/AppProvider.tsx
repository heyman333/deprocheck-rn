import React, { useReducer } from 'react';
import AppContext, {
  AactionType,
  State,
  initialState,
} from '../contexts/AppContext';

const AppConsumer = AppContext.Consumer;

interface Action {
  type: AactionType;
  payload: any;
}

interface Props {
  children?: React.ReactElement;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return {
        ...state,
        theme: action.payload.theme,
      };
    case 'SET_TAB_VISIBLE':
      return {
        ...state,
        tabVisible: action.payload.tabVisible,
      };
    case 'SET_MODAL_INFO':
      return {
        ...state,
        modalInfos: action.payload.modalInfos,
      };
    case 'SET_MODAL_VISIBLE':
      return {
        ...state,
        modalVisible: action.payload.modalVisible,
      };
    default:
      return state;
  }
};

function AppProvider(props: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
}

export { AppConsumer, AppProvider, AppContext };
