import { StyleSheet, Text, Image, View, Alert, Button, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Post } from '../components/Post';
import axios from 'axios';
import React from 'react';
import { Loading } from '../components/Loading';
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


export const HomeScreen = ({ navigation, name, password }) => {
  const [isLoading, setisLoading] = React.useState(false);
  const [items, setItems] = React.useState();
  // const [name, setName] = React.useState();
  // const [password, setPassword] = React.useState();
  const [barcode, setBarcode] = React.useState();
  const [price, setPrice] = React.useState();
  const [isAuth, setisAuth] = React.useState(true);

  const logout = () => {
    console.log('logout');
    setisAuth(false);
  }
  if(!isAuth){
    // return <AuthScreen/>
  }


  const getData = () => {
    // await retrieveData();
    console.log('props', name);
    console.log('barcode', barcode);
    setisLoading(true);
    axios
    
     .post("https://test2.isoftik.kz/company/api/pricecheckerAuth.php?class=ChargeanywhereApi&method=getData", 
     {
       password:password,
       name: name,
       barcode: barcode
    },
     {
       headers: {
       'Content-Type': 'multipart/form-data'
     }
    })
     .then(({ data }) => {
       setPrice(data[0].price);
       console.log('data', data[0].price);
       setisLoading(false);
     })
     .catch(err => {
       console.log('err', err);
       Alert.alert('Error', 'no articles received');
     }).finally(() => {
       setisLoading(false);
     })
   }

  // "company/api/client.php?class=payment-result&method=handle"


  // React.useEffect(fetchPosts, []) 
  // React.useEffect(setName(name), [])


  if(isLoading) {
   return <Loading/>
  }

  return (
    <Wrapper>
      <TextInputAuth
         placeholder="Enter barcode"
         value={barcode}
         onChangeText={setBarcode}
      />
      <Button
         onPress={getData}
         title="get data"
      />
      <Text>{ price }</Text>
      {/* <FlatList
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />}
        data={items}
        renderItem={({ item }) => 
         <TouchableOpacity onPress={() => navigation.navigate('FullPost', {id:item.id, title:item.title})}>
            <Post title={item.title}/>
         </TouchableOpacity>
         }
      /> */}

    </Wrapper>
    
  );
}

// getResource('https://jsonplaceholder.typicode.com/posts/1');
// const getResource = async(url) => {
//   const response = await fetch(url);
//   console.log(response);
// }
