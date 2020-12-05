import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import RootNavigator from './screens/RootNav/RootNav';

function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
