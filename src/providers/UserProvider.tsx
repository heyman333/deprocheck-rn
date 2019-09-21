import React, { useReducer } from 'react';
import UserContext, {
  Action,
  State,
  initialState,
} from '../contexts/UserContext';

const AuthConsumer = UserContext.Consumer;

interface Props {
  children?: React.ReactElement;
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        userInfo: action.payload.userInfo,
      };
    default:
      return state;
  }
};

function UserProvider(props: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
}

export { AuthConsumer, UserProvider, UserContext };
