import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './store/Store';
import AppNavigator from './Routes/AppNavigator';

function App(): React.JSX.Element {

  return (
    <Provider store={Store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;
