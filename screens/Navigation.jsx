
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./Home";
import { AuthScreen } from "./Auth";
import { ProductScreen } from './Product';
import { StyleSheet} from 'react-native'; 
import React from 'react';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import ModalMenuScreen from "./ModalMenu";

export const Navigation = () => {
   
   const Stack = createNativeStackNavigator();
   const barCodeImage = (navigation) => {
      return <MaterialCommunityIcons
         onPress={() => {
            navigation.navigate('Home', {test:1});
         }} 
         style={styles.headerScan} 
         name="barcode-scan" 
         size={24} 
         color="white" 
      />
   }

   return (

      <Stack.Navigator>

         <Stack.Group
             screenOptions={({navigation}) => ({
               title: 'Проверка цен',
               headerStyle: { backgroundColor: '#2F80ED' }, 
               headerTintColor: '#fff',
               headerTitleStyle: {
               fontWeight: 'bold',
               fontSize: 20
               },
               headerTitleAlign: 'center'
             })}
             >
            <Stack.Screen name="Auth" component={AuthScreen} 
            options={{
               
               headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: '#fff'
                },
               }}/>
               
            <Stack.Screen name="Home" component={HomeScreen} options={({navigation}) => ({
                headerLeft: () => (
                  <Feather 
                     style={styles.menu} 
                     name="menu" 
                     size={24} 
                     color="white" 
                     onPress={() => {
                        navigation.navigate('ModalMenu');
                     }}
                  />
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
            <Stack.Screen name="Product" component={ProductScreen} 
               options={({ navigation }) => ({
                  headerRight: () => (
                     barCodeImage(navigation)
                  ),
               })
               }
            />

         </Stack.Group>
         <Stack.Group screenOptions={{ presentation: 'modal' }}>
            <Stack.Screen name="ModalMenu" component={ModalMenuScreen} options={{title: 'Меню'}} />
         </Stack.Group>
      </Stack.Navigator>);

}

const styles = StyleSheet.create({
   header:{
     height: 10,
     backgroundColor: 'red',
   },
   modal:{
      width: 100,
      height:100,
      backgroundColor: 'red'
   }
 })