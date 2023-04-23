import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import { FullPostScreen } from "./FullPost";
import { AuthScreen } from "./Auth";
import {ProductScreen} from './Product';
import { Header } from "../components/Header";
import { View, StatusBar, Text, TextInput, StyleSheet } from 'react-native'; 

const Stack = createNativeStackNavigator();

export const Navigation = () => {
   return (
   <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="Auth" component={AuthScreen} options={{title: 'Authorisation'}}/>
         <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Barcode input', headerBackVisible: false}}/>
         <Stack.Screen name="Product" component={ProductScreen} options={{title: 'Product'}}/>
         <Stack.Screen name="Header" component={Header} options={{title: 'Header'}}/>
         {/* <Stack.Screen name="FullPost" component={FullPostScreen} options={{title: 'Article'}}/> */}
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
   }
 })