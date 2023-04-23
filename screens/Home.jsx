import { StyleSheet, Text, Image, View, Alert, Button, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Post } from '../components/Post';
import axios from 'axios';
import React from 'react';
import { Loading } from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '../components/Header';

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


export const HomeScreen = ({ navigation, name, password, route }) => {
  const [isLoading, setisLoading] = React.useState(false);
  const [items, setItems] = React.useState();
  // const [name, setName] = React.useState();
  // const [password, setPassword] = React.useState();
  const [barcode, setBarcode] = React.useState();
  const [price, setPrice] = React.useState();
  const [itemData, setItemData] = React.useState();
  const [isAuth, setisAuth] = React.useState(true);
  const [isProductPage, setisProductPage] = React.useState(false);
  const {nameR} = route.params;
  const logout = () => {
    console.log('logout');
    setisAuth(false);
  }
  if(!isAuth){
    // return <AuthScreen/>
  }


  const getData = () => {
    // await retrieveData();
    console.log('props', nameR);
    console.log('barcode', barcode);
    setisLoading(true);
    axios
     .post("https://test2.isoftik.kz/company/api/pricecheckerAuth.php?class=ChargeanywhereApi&method=getData", 
     {
       password:password,
       name: nameR,
       barcode: barcode
    },
     {
       headers: {
       'Content-Type': 'multipart/form-data'
     }
    })
     .then(({ data }) => {
       setPrice(data[0].price);
       setItemData(data[0]);
       console.log('data', data[0].price);
       setisLoading(false);
     })
     .catch(err => {
       console.log('err', err);
       Alert.alert('Error', 'no articles received');
     }).finally(() => {
       setisLoading(false);
       setisProductPage(true);
       console.log('finally', price);
       
     })
   }

   const goToProductPage = () => {
    setisProductPage(false)
    if(isProductPage){
      navigation.navigate('Product', {price:price, name:nameR, itemData:itemData});
     }
   }

   
   const changeUser = () => {
    navigation.navigate('Auth', {auth: false});
   }


  // "company/api/client.php?class=payment-result&method=handle"


  React.useEffect(goToProductPage, [isProductPage]) 
  // React.useEffect(setName(name), [])


  if(isLoading) {
   return <Loading/>
  }

  return (
    <>
    <Header
      navigation={navigation}
      name={nameR}
    />
    {/* <View style={styles.header}>
    <View style={styles.headerWrapper}>
        <Feather style={styles.menu} name="menu" size={24} color="white" />
        <Text style={styles.headerText}>Проверка цен</Text>
        <MaterialCommunityIcons style={styles.headerScan} name="barcode-scan" size={24} color="white" />
    </View>
  </View> */}
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
      <Button
         onPress={changeUser}
         title="change user"
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
    </>
  );
}

// getResource('https://jsonplaceholder.typicode.com/posts/1');
// const getResource = async(url) => {
//   const response = await fetch(url);
//   console.log(response);
// }
const styles = StyleSheet.create({
  header:{
    // flex: 1,
    padding: 16,
    height: 56,
    backgroundColor: '#2F80ED',
  },
  headerWrapper: {
    // flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  menu:{
    // verticalAlign: 'center',
    // flex: 1
  },
  headerText: {
    flex: 0.8,
    color: 'white',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    verticalAlign: 'bottom',
    fontSize: 20,
    
  },
  headerScan:{
    // flex: 1
  }
})