import { StyleSheet, Text, Image, View, Alert, ScrollView, TextInput, Pressable } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import React from 'react';
import { Loading } from '../components/Loading';
import { useSelector, useDispatch } from 'react-redux';


export const HomeScreen = ({ navigation, route }) => {
  const [isLoading, setisLoading] = React.useState(false);
  const [barcode, setBarcode] = React.useState('');
  const [itemData, setItemData] = React.useState();
  const [isProductPage, setisProductPage] = React.useState(false);
  const [error, setError] = React.useState();
  const authKey = useSelector(state => state.authKey)

  const getData = () => {
    console.log('barcode', barcode);
    setisLoading(true);
    axios
    //  .post("https://test2.isoftik.kz/company/ajax.php",
    //  {
    //     class: 'PriceChecker',
    //     method: 'getData',
    //     barcode: barcode
    // },
    .post("https://test2.isoftik.kz/company/api/rest.php",
      {
        token: authKey,
        endpoint: 'getItemsByBarcode',
        barcode: barcode,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
     .then(({ data }) => {
      if(data != false){
        setItemData(data);
        setisProductPage(true);
        setError('');
        setBarcode('');
      } else {
        setError('Товар с таким штрихкодом не найден');
      }

     })
     .catch(err => {
       console.log('err', err);
       Alert.alert('Ошибка', err);
     }).finally(() => {
       setisLoading(false);
     })
   }

   const goToProductPage = () => {
    setisProductPage(false)
    if(isProductPage){
      navigation.navigate('Product', {itemData:itemData});
     }
   }

  
  React.useEffect(goToProductPage, [isProductPage]) 

  if(isLoading) {
   return <Loading/>
  }

  return (
    <ScrollView style={styles.homeWrapper}>
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
        <View style={styles.centeredView}>
        <Pressable
        style={({pressed}) => [{
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#219653',
        }, 
            styles.button, styles.buttonOpen
          ]
        }
        onPress={()=>{
          if(barcode != ''){
            getData()
          } else {
            Alert.alert('Ошибка', 'введите штрих код')
          }
        }}>
        <Text style={styles.textStyle}>Проверить</Text>
      </Pressable>
        </View>
        <View style={styles.buttonWrapper}>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  
  button: {
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginTop: 20,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
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
    textAlignVertical: 'bottom',
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