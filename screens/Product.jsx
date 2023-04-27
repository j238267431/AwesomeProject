import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../components/Header';


export const ProductScreen = ({route, navigation}) => {
   const [isLoading, setisLoading] = React.useState(true);
   const [items, setItems] = React.useState();
   const {price, name, itemData} = route.params;
   console.log(itemData.picture);
   
   return (
      <>
      {/* <Header
         navigation={navigation}
         name={name}
      /> */}
         <ScrollView style={styles.wrapper}>
            <View style={styles.imageNameWrapper}>
               <Image
                  style={styles.tinyLogo}
                  source={{uri: itemData.picture}}
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
         </ScrollView>
      </>
   )
}

const styles = StyleSheet.create({
   wrapper:{
      overflow: 'scroll',
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
      borderTopLeftRadius: 50,
      borderBottomRightRadius: 50,
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
   },
   tinyLogo:{
      width: 150,
      height: 150
   }

})