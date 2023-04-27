import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import { AuthScreen } from "./Auth";
import { ProductScreen } from './Product';
import { Header } from "../components/Header";
import { StyleSheet, Button, Text, View } from 'react-native'; 
import React from 'react';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();

export const Navigation = () => {


   const openModal = () => {

   }


   const barCodeImage = (navigation) => {
      return <MaterialCommunityIcons
         onPress={() => {
            navigation.navigate('Home');
         }} 
         style={styles.headerScan} 
         name="barcode-scan" 
         size={24} 
         color="white" 
      />
   }
   const menuImage = (navigation) => {
      return <Feather 
         style={styles.menu} 
         name="menu" 
         size={24} 
         color="white" 
         onPress={openModal}
      />
   }

// devtest2
if(true){
   <View style={styles.modal}>
   <Text>
      modal
   </Text>
   </View>
}


   return (
   <NavigationContainer>
      <Stack.Navigator>
         <Stack.Group
            // screenOptions={{ 
            //    title: 'Проверка цен',
            //    headerStyle: { backgroundColor: '#2F80ED' }, 
            //    headerTintColor: '#fff',
            //    headerTitleStyle: {
            //    fontWeight: 'bold',
            //    fontSize: 20
            //  },}}
             screenOptions={({navigation}) => ({
               title: 'Проверка цен',
               headerStyle: { backgroundColor: '#2F80ED' }, 
               headerTintColor: '#fff',
               headerTitleStyle: {
               fontWeight: 'bold',
               fontSize: 20
               }
             })}
             >
            <Stack.Screen name="Auth" component={AuthScreen} options={{
               headerLeft: () => (
                  menuImage()
               ),
               headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: '#fff'
                },
               }}/>
               
            <Stack.Screen name="Home" component={HomeScreen} options={({navigation}) => ({
                headerLeft: () => (
                  menuImage(navigation)
               ),
               headerBackVisible: false, 
               headerStyle: {
                  backgroundColor: '#2F80ED',
               },
               headerTintColor: '#fff',
               headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20
                }
            })}
               />
            {/* <Stack.Screen name="Product" component={ProductScreen} options={{
               title: 'Product',
               headerRight: () => (
                  barCodeImage(navigation)
               ),
               }}/> */}
            <Stack.Screen name="Product" component={ProductScreen} 
               options={({ navigation }) => ({
                  headerRight: () => (
                     barCodeImage(navigation)
                  ),
               })
               }
            />



            <Stack.Screen name="Header" component={Header} options={{title: 'Header'}}/>
         </Stack.Group>
      </Stack.Navigator>
   </NavigationContainer>);

}

const styles = StyleSheet.create({
   header:{
     // flex: 1,
     height: 10,
     backgroundColor: 'red',
   },
   wrapper:{
     // flex: 1,
     // backgroundColor: 'red'
   },
   modal:{
      width: 100,
      height:100,
      backgroundColor: 'red'
   }
 })