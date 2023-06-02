import React from 'react';
import { View, Image, Text, StyleSheet, FlatList, Dimensions, TextInput, Alert, Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Loading } from '../components/Loading';

export const ProductScreen = ({route}) => {
   const [itemData, setItemData] = React.useState();
   const [isLoading, setisLoading] = React.useState(false);
   // const {itemData} = route.params;
   const [isPortrait, setIsPortrait] = React.useState();
   const inputRef2 = React.useRef();
   const authKey = useSelector(state => state.authKey);
   const [barcode, setBarcode] = React.useState('');
   const [error, setError] = React.useState('');
   inputRef2.current?.focus();
   Dimensions.addEventListener('change', () => {
      console.log('Dimensions');
      defineOrientation();
    });

    const defineOrientation = () => {
      var dim = Dimensions.get('screen');
      setIsPortrait(dim.height >= dim.width ? true : false)
     }



   const getData = () => {
    console.log('barcode', barcode);
    setisLoading(true);
    axios
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
         console.log('data', data);
         setItemData(data);
         inputRef2.current?.focus();
         // setBarcode('');
         console.log('itemData', itemData);
      //   setisProductPage(true);
        setError('');
      //   setBarcode('');
      } else {
        setError('Товар с таким штрихкодом не найден');
        setItemData('');

      }

     })
     .catch(err => {
       console.log('err', err);
       Alert.alert('Ошибка', err);
     }).finally(() => {
      setBarcode('');
       setisLoading(false);
     })
   }




    React.useEffect(defineOrientation);
    React.useEffect(() => {
      setItemData(route.params.itemData)
    }, [])





    const focusInput = () => {

      inputRef2.current?.focus();
    }
    React.useEffect(focusInput,[])

   const Item = ({item}) => {
      return (
         
      <View style={styles.wrapper}>
         <View style={styles.boxShadowWrapper}>
            <Text style={styles.barCodeArticul}>{item.mainShtrih}</Text>
         </View>
         <View style={styles.imageNameWrapper}>
            <Image
               style={styles.tinyLogo}
               source={{uri: item.picture}}
            />
            <View style={[styles.boxShadowWrapper, styles.itemNameWrapper]}>
               <Text style={styles.productName}>{item.name}</Text>
            </View>  
         </View>
         <View style={[styles.boxShadowWrapper, styles.itemNameWrapper]}>
            <Text style={styles.productPriceText}>{item.price}</Text>
         </View>
         <View style={styles.boxShadowWrapper}>
            <Text style={styles.productDescription}>
               {item.description}
            </Text>
         </View>
      </View>
      )
   }

   

   const ItemLandscape = ({item}) => {
      return (
         
      <View style={styles.wrapper}>
         <View style={styles.landScapeWrapper}>
            <View style={[styles.boxShadowWrapper, styles.landScapeBarCodeWrapper]}>
               <Text style={styles.barCodeArticul}>{item.mainShtrih}</Text>
            </View>
            <View style={[styles.boxShadowWrapper, styles.landScapeitemNameWrapper]}>
                  <Text style={styles.productName}>{item.name}</Text>
            </View>  
         </View>
         
         <View style={styles.imageNameWrapper}>
            <Image
               style={styles.tinyLogo}
               source={{uri: item.picture}}
            />
         <View style={[styles.boxShadowWrapper, styles.itemNameWrapper]}>
            <Text style={styles.productPriceText}>{item.price}</Text>
         </View>
         </View>

         <View style={styles.boxShadowWrapper}>
            <Text style={styles.productDescription}>
               {item.description}
            </Text>
         </View>
      </View>
      )
   }

   const ErrorTag = () => {
      if(error != ''){
         return (
            <View style={{alignItems: 'center'}}>
               <Text style={styles.errorText}>{error}</Text>
             </View>
            )
      }

   }


   if(isLoading) {
      return <Loading/>
   }
   
   if(isPortrait){
      return (
         <>
         <View style={styles.inputWrapper}>
            <TextInput
               ref={inputRef2}
               style={styles.barCodeInput}
               placeholder="Enter barcode"
               placeholderTextColor="#2F80ED"
               value={barcode}
               onChangeText={setBarcode}
               onSubmitEditing={() => {
                  if(barcode != ''){
                     getData()
                   } else {
                     Alert.alert('Ошибка', 'введите штрих код')
                     setTimeout(()=>{
                        inputRef2.current?.focus();
                     }, 100)
                     
                   }
                  } 
               }
            />
         </View>
            <ErrorTag/>
            <FlatList
               data={itemData}
               renderItem={({item}) => <Item item = {item}/>}
            />
            
         </>
      )
   } else{
      return (
         <>
         <View style={styles.inputWrapper}>
      <TextInput
         ref={inputRef2}
         style={styles.barCodeInput}
         placeholder="Enter barcode"
         placeholderTextColor="#2F80ED"
         value={barcode}
         onChangeText={setBarcode}
         onSubmitEditing={() => {
            if(barcode != ''){
               getData()
             } else {
               Alert.alert('Ошибка', 'введите штрих код')
               setTimeout(()=>{
                  inputRef2.current?.focus();
               }, 100)
               
             }
            } 
         }
      />
   </View>
            <ErrorTag/>
            <FlatList
               data={itemData}
               renderItem={({item}) => <ItemLandscape item = {item}/>}
            />
            
         </>
      )
   }

}

const styles = StyleSheet.create({

   landScapeWrapper:{
      flexDirection: 'row',
   },
   landScapeBarCodeWrapper:{
      flex:0.5,
      marginRight: 17,
   },
   wrapper:{
      overflow: 'scroll',
      backgroundColor: 'white',
      flex:1,
      paddingTop: 12,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 12,
   },
   boxShadowWrapper:{
      justifyContent: "center",
      alignItems: "center",
      flex:1,
      shadowOffset: { height: 10, width: 0 },
      shadowColor: '#000000',
      shadowOpacity: 0.4,
      shadowRadius: 5,
      paddingBottom: 10,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight:10,
      backgroundColor: 'white',
      borderRadius: 15,
      marginBottom: 31,
      elevation: 3

   },
   itemNameWrapper: {
      borderRadius: 20,
      paddingBottom: 30,
      paddingTop: 30,
      paddingLeft: 10,
      paddingRight:10,
   },
   imageNameWrapper:{
      flexDirection: 'row',
   },
   nameWrapper:{
      flex:1,
      justifyContent: "center",
      alignItems: "center",
   },
   productName:{
      fontSize: 24,
      textTransform: 'capitalize',
      fontWeight: 700,
      fontFamily: 'Roboto-Medium',
      color: '#333333',
   },
   productPriceBlockWrapper:{
      marginTop: 44,
      justifyContent: "center",
      alignItems: "center",
   },
   productPriceBlock:{
      backgroundColor: '#219653',
      borderTopLeftRadius: 50,
      borderBottomRightRadius: 50,
      // flex:0.5,
      justifyContent: "center",
      alignItems: "center",
      width: 300,
      minHeight: 100,
      padding: 5,
      // flexWrap: 'wrap'
      
   },
   productPriceText:{
      fontSize: 72,
      fontWeight: 300,
      fontFamily: 'Roboto-Medium',
      color: '#000',
      
      
   },
   barCodeArticulWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 300,
   },
   barCodeArticul:{
      fontSize: 24,
      fontWeight: 400,
      fontFamily: 'Roboto-Medium',
   },
   productDescription:{
      fontSize: 14,
      fontWeight: 400,
      fontFamily: 'Roboto-Medium',
   },
   tinyLogo:{
      width: 150,
      height: 150
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
    inputWrapper:{
      backgroundColor: '#219653',
      borderTopLeftRadius: 50,
      borderBottomRightRadius: 50,
      // flex:0.1,
      justifyContent: "center",
      alignItems: "center",
      width: 300,
      height: 100,
      // opacity: 0,
      height: 0,
      position: 'absolute',
      top:-1000,

    },
    errorText:{
      color: 'red',
      marginTop: 20,
      fontWeight: 'bold',
      fontSize: 20,

    }, 

})