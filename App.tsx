import React from 'react';
import { NavigationContainerComponent } from 'react-navigation';
import { ThemeProvider } from 'styled-components';

import MainNavigator from './src/navigators/MainNavi';
import { registerAppContainer } from './src/navigators/NavigationService';
import { createTheme } from './src/utils/theme';
import { AppContext } from './src/contexts';
import { AppProvider } from './src/providers/AppProvider';
import { UserProvider } from './src/providers/UserProvider';
import CustomModal from './src/components/CustomModal';

const App = () => {
  const appContainer = React.useRef<NavigationContainerComponent>(null);
  const {
    state: { theme },
  } = React.useContext(AppContext);

  React.useEffect(() => {
    if (appContainer.current) {
      registerAppContainer(appContainer.current);
    }
  }, [appContainer]);

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <MainNavigator ref={appContainer} />
    </ThemeProvider>
  );
};

const ContextInjectedApp = () => (
  // 다음처럼 Provider를 App으로 감싸는건 state가 바뀔때 마다 앱 전체가 리 렌더링 되는 퍼포먼스 이슈가 있다.
  <AppProvider>
    <UserProvider>
      <React.Fragment>
        <App />
        <CustomModal />
      </React.Fragment>
    </UserProvider>
  </AppProvider>
);

export default ContextInjectedApp;
