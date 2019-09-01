import React from 'react';
import { NavigationContainerComponent } from 'react-navigation';
import { ThemeProvider } from 'styled-components';

import MainNavigator from './src/navigators/MainNavi';
import { registerAppContainer } from './src/navigators/NavigationService';
import { createTheme } from './src/utils/theme';
import { AppContext } from './src/contexts/AppContext';
import { AppProvider } from './src/providers/AppProvider';

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
  <AppProvider>
    <App />
  </AppProvider>
);

export default ContextInjectedApp;
