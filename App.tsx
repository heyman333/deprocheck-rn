import React from 'react';
import MainNavigator from './src/navigators/MainNavi';
import { NavigationContainerComponent } from 'react-navigation';

import { ThemeProvider } from 'styled-components';
import { registerAppContainer } from './src/navigators/NavigationService';
import { createTheme } from './src/utils/theme';

const App = () => {
  const appContainer = React.useRef<NavigationContainerComponent>(null);

  React.useEffect(() => {
    if (appContainer.current) {
      registerAppContainer(appContainer.current);
    }
  }, [appContainer]);

  return (
    <ThemeProvider theme={createTheme('ADMIN')}>
      <MainNavigator ref={appContainer} />
    </ThemeProvider>
  );
};

export default App;
