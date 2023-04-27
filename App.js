import React from 'react';
import { Navigation } from './screens/Navigation';
import { useFonts } from 'expo-font';


export default function App() {

  const [fontsLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto/Roboto-Black.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return<Navigation/>;
}

