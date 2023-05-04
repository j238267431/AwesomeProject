import React from 'react';
import { Navigation } from './screens/Navigation';
import { useFonts } from 'expo-font';
import { NavigationContainer } from "@react-navigation/native";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const defaultState = {
  cash: 0,
  isModal: false,
  authKey: '',
}

const reducer = (state = defaultState, action) => {
  switch (action.type){
    case 'ADD_CASH':
      return {...state, cash: state.cash + action.payload}
    case 'GET_CASH':
      return {...state, cash: state.cash - action.payload}
    case 'SHOW_MODAL':
      return {...state, isModal: action.payload}
    case 'HIDE_MODAL':
      return {...state, isModal: action.payload}
    case 'SAVE_AUTH_KEY':
      return {...state, authKey: action.payload}
    case 'REMOVE_AUTH_KEY':
      return {...state, authKey: action.payload}
    default: 
      return state;
  }
}

const store = createStore(reducer);

export default function App() {

  const [fontsLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto/Roboto-Black.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return(   
    <Provider store={store}>
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer>
    </Provider>
  );
}
