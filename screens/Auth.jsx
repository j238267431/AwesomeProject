import { 
   StyleSheet, 
   Text, 
   Image, 
   View, 
   TextInput, 
   Alert, 
   FlatList, 
   ActivityIndicator, 
   RefreshControl, 
   TouchableOpacity,
   Button,
} from 'react-native';
import styled from 'styled-components/native';
import { Post } from '../components/Post';
import axios from 'axios';
import React from 'react';
import { Loading } from '../components/Loading';
import {HomeScreen} from './Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Wrapper = styled.View`
   padding: 10px;
   width:100%;
   height:100%;
   display: flex;
   justify-content: center;
   align-items: center;
`;
const TextInputAuth = styled.TextInput`
   border: 2px solid black;
   width: 100%;
   padding: 10px;
   margin-bottom: 10px;
`;

const ButtonAuth = styled.Button`
   width: 100%;
   background: black;
   border: 1px solid black;
`;


export const AuthScreen = ({ navigation }) => {


  const [isLoading, setisLoading] = React.useState(false);
  const [items, setItems] = React.useState();
  const [name, setname] = React.useState();
  const [password, setPassword] = React.useState();
  const [isAuth, setIsAuth] = React.useState(false);


  const Header = styled.View`
    flex: 0.1;
    // hieght: 10px;
    width: 100%;
    background-color: #74992e;
`;

  const  makeAuth = () => {
    setisLoading(true);
    console.log('authName', name)
    console.log('password', password);
    axios
   //  .get('https://643bcc76447794557360cb78.mockapi.io/articles')
    .post("https://test2.isoftik.kz/company/api/pricecheckerAuth.php?class=ChargeanywhereApi&method=handle", 
    {
      password:password,
      name: name
   },
    {
      headers: {
      'Content-Type': 'multipart/form-data'
    }
   })
    .then(({ data }) => {
      setIsAuth(data.auth)
      setItems(data);
      console.log(items);
    })
    .catch(err => {
      console.log('err', err);
      Alert.alert('Error', 'no articles received');
    }).finally(() => {
      setisLoading(false);
    })
  }



  // "company/api/client.php?class=payment-result&method=handle"

  React.useEffect(() => {
    setIsAuth(false);
    if(isAuth){
      // return <HomeScreen
      //   name={name}
      //   password={password}
      // />
      // return <Navigation/>
      navigation.navigate('Home', {nameR:name});
    }
  }, [isAuth]) 
  // React.useEffect(fetchPosts, []) 
if(isLoading) {
  return <Loading/>
 }

// if(isAuth){
//   // return <HomeScreen
//   //   name={name}
//   //   password={password}
//   // />
//   // return <Navigation/>
//   navigation.navigate('Home', {nameR:name});
// }


  return (
    <>

    <Wrapper>
      
      <TextInputAuth
         placeholder="Name"
         value={name}
         onChangeText={setname}
      />
        <TextInputAuth
         placeholder="Password"
         value={password}
         onChangeText={setPassword}
      />
      <Button
        //  onPress={makeAuth}
        onPress={makeAuth}
         title="Log in"
      />

   </Wrapper>
   </>
  );

  
}

// getResource('https://jsonplaceholder.typicode.com/posts/1');
// const getResource = async(url) => {
//   const response = await fetch(url);
//   console.log(response);
// }


