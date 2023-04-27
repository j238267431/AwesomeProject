import { StyleSheet, Text, Image, View, Alert, Button, ScrollView, TextInput } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import React from 'react';
import { Loading } from '../components/Loading';
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


export const HomeScreen = ({ navigation, route }) => {
  const [isLoading, setisLoading] = React.useState(false);
  const [barcode, setBarcode] = React.useState();
  const [price, setPrice] = React.useState();
  const [itemData, setItemData] = React.useState();
  const [isProductPage, setisProductPage] = React.useState(false);
  const [isAuthPage, setisAuthPage] = React.useState(false);
  // const {nameR} = route.params;
  const [error, setError] = React.useState();

  const logout = () => {
    setisLoading(true);
    axios
     .get("https://test2.isoftik.kz/login.php?do=logout")
     .then(({ data }) => {
        console.log('logout', data);
        setisAuthPage(true);
     })
     
     .catch(err => {
       console.log('err', err);
       Alert.alert('Ошибка', err);
     }).finally(() => {
       setisLoading(false);
     })
   }

  const getData = () => {
    // console.log('props', nameR);
    console.log('barcode', barcode);
    setisLoading(true);
    axios
     .post("https://test2.isoftik.kz/company/ajax.php",
     {
        class: 'PriceChecker',
        method: 'getData',
        barcode: barcode
    },
     {
       headers: {
       'Content-Type': 'multipart/form-data'
     }
    })
     .then(({ data }) => {
      if(data != false){
        setPrice(data[0].price);
        setItemData(data[0]);
        setisProductPage(true);
        setError('');
      } else {
        setError('Товар с таким штрихкодом не найден');
      }

      console.log('dataPrice', data);

     })
     .catch(err => {
       console.log('err', err);
       Alert.alert('Ошибка', err);
     }).finally(() => {
       setisLoading(false);
       
       console.log('finally', price);
       
     })
   }

   const goToProductPage = () => {
    setisProductPage(false)
    if(isProductPage){
      navigation.navigate('Product', {itemData:itemData});
     }
   }

   const goToAuthPage = () => {
    setisProductPage(false)
    if(isAuthPage){
      navigation.navigate('Auth');
     }
   }
  React.useEffect(goToProductPage, [isProductPage]) 
  React.useEffect(goToAuthPage, [isAuthPage]) 


  if(isLoading) {
   return <Loading/>
  }

  return (
    <ScrollView style={styles.homeWrapper}>
      {/* <Header
        navigation={navigation}
        // name={nameR}
      /> */}
      <View style={styles.imageWrapper}>
        <Image
          style={styles.homeImage}
          source={require('../assets/barcode-scanner.png')}
        />
      </View>
      <View style={styles.wrapper}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
        <View style={styles.productPriceBlockWrapper}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.barCodeInput}
            placeholder="Enter barcode"
            placeholderTextColor="#2F80ED"
            value={barcode}
            onChangeText={setBarcode}
          />
        </View>
        </View>
        <View style={styles.buttonWrapper}>
        <Button
          style={styles.barcodeButton}
          onPress={getData}
          title="Проверить"
        />
        <Button
          style={styles.barcodeButton}
          onPress={logout}
          title="выход"
        />
        </View>
        <View style={styles.buttonWrapper}>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  errorText:{
    color: 'red',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20
  }, 
  homeWrapper:{
    flex: 1,
    backgroundColor: 'white',
  },
  productPriceBlockWrapper:{
    marginTop: 44,
    justifyContent: "center",
    alignItems: "center",
 },
  barcodeButton:{
    marginTop: 10,
    width: 100,
    color: 'black'
  },
  buttonWrapper:{
    display: 'flex',
    pading: 10
  },
  inputWrapper:{

    backgroundColor: '#219653',
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
    // flex:0.1,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    height: 100,

  },
  barCodeInput:{
    height: 20,
    zIndex:111,
    color: '#2F80ED',
    fontSize:20,
    width: 250,
    height: 50,
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    textAlign: 'center',
    padding: 5,
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
    // flex: 0.8,
    color: 'white',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    verticalAlign: 'bottom',
    fontSize: 20,
    
  },
  headerScan:{
    // flex: 1
  },
  homeImage:{
    width: 250,
    height: 250,
  },
  imageWrapper:{
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper:{
    marginTop: 10,
    justifyContent: 'center'
  }
})