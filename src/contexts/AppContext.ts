import React from 'react';
import { ImageSourcePropType } from 'react-native';

interface ModalInfosType {
  titleImage?: ImageSourcePropType;
  message?: string;
  subMessage?: string;
  buttons?: React.ReactElement[];
}

export type AactionType =
  | 'CHANGE_THEME'
  | 'SET_TAB_VISIBLE'
  | 'SET_MODAL_INFO'
  | 'SET_MODAL_VISIBLE';

export interface Action {
  type: AactionType;
  payload: any;
}

export interface State {
  theme: 'ADMIN' | 'MEMBER';
  tabVisible: boolean;
  modalVisible: boolean;
  modalInfos: ModalInfosType;
}

export const initialState: State = {
  theme: 'MEMBER',
  tabVisible: false,
  modalVisible: false,
  modalInfos: {},
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
