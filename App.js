import React from 'react';
import { Navigation } from './screens/Navigation';
import { useFonts } from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reduxStore from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';



// const store = createStore(reducer);

export default function App() {

  const {store, persistor} = reduxStore();
  const [fontsLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto/Roboto-Black.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return(   
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
