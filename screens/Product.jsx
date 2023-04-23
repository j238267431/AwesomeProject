import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { Loading } from '../components/Loading';
import { Header } from '../components/Header';


export const ProductScreen = ({route, navigation}) => {
   const [isLoading, setisLoading] = React.useState(true);
   const [items, setItems] = React.useState();
   const {price, name, itemData} = route.params;

   return (
      <>
      <Header
         navigation={navigation}
         name={name}
      />
         <View style={styles.wrapper}>
            <View style={styles.imageNameWrapper}>
               <Image
                  source={require('../assets/coke.png')}
               />
               <View style={styles.nameWrapper}>
                  <Text style={styles.productName}>{itemData.name}</Text>
               </View>  
            </View>
            <View style={styles.productPriceBlockWrapper}>
               <View style={styles.productPriceBlock}>
                  <Text style={styles.productPriceText}>{itemData.price}</Text>
               </View>
            </View>
            <View style={styles.productPriceBlockWrapper}>
               <View style={styles.barCodeArticulWrapper}>
                  <Text style={styles.barCodeArticul}>{itemData.mainShtrih}</Text>
                  <Text style={styles.barCodeArticul}>{itemData.articul}</Text>
               </View>
            </View>
            <View style={styles.productPriceBlockWrapper}>
               <Text style={styles.productDescription}>
                  {itemData.description}
               </Text>
            </View>
         </View>
      </>
   )
}

const styles = StyleSheet.create({
   wrapper:{
      backgroundColor: 'white',
      flex:1,
      paddingTop: 12,
      paddingLeft: 15,
      paddingRight: 15,
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
      borderTopLeftRadius: '50',
      borderBottomRightRadius: '50',
      // flex:0.1,
      justifyContent: "center",
      alignItems: "center",
      width: 300,
      height: 150,
   },
   productPriceText:{
      fontSize: 72,
      fontWeight: 300,
      fontFamily: 'Roboto-Medium',
      color: '#F2F2F2',
   },
   barCodeArticulWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: 300,
   },
   barCodeArticul:{
      fontSize: 18,
      fontWeight: 400,
      fontFamily: 'Roboto-Medium',
   },
   productDescription:{
      fontSize: 14,
      fontWeight: 400,
      fontFamily: 'Roboto-Medium',
   }

})