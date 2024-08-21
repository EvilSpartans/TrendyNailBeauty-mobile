import React from 'react';
import { Provider } from 'react-redux';
import { Store } from './store/Store';
import AppNavigator from './Routes/AppNavigator';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {

  return (
    <Provider store={Store}>
      <AppNavigator />
      <Toast />
    </Provider>
  );
}

export default App;
