import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';


export const Header = ( {navigation, name} ) => {

  return (
   <View style={styles.header}>
      <View style={styles.headerWrapper}>
         <Feather style={styles.menu} name="menu" size={24} color="white" />
         {/* <Text style={styles.headerText}>Проверка цен</Text> */}
         <MaterialCommunityIcons
          onPress={() => {
            navigation.navigate('Home', {nameR:name});
          }} 
          style={styles.headerScan} 
          name="barcode-scan" 
          size={24} 
          color="white" 
         />
      </View>
   </View>
  );
}

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
    fontWeight: 'bold',
    verticalAlign: 'bottom',
    fontSize: 20,
    
  },
  headerScan:{
    // flex: 1
  }
})