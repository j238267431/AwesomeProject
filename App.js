import React from 'react';
import {HomeScreen} from './screens/Home';
import {FullPostScreen} from './screens/FullPost'
import { View, StatusBar, Text, TextInput } from 'react-native'; 
import { Navigation } from './screens/Navigation';
import { AuthScreen } from './screens/Auth'

export default function App() {
  

  // if(!isAuth){
  //   return (
  //     // <View>
  //       <TextInput
  //         placeholder='Email'
  //       />
  //     // </View>
  //     );
  // };
  // if(!isAuth){
    return <AuthScreen/>
  // }

  // return <Navigation/>;
  // return (<View>
  //   <FullPostScreen/>
  // </View>)
}

// getResource('https://jsonplaceholder.typicode.com/posts/1');
// const getResource = async(url) => {
//   const response = await fetch(url);
//   console.log(response);
// }
