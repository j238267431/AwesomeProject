import React from "react";
import { Text, View, ActivityIndicator, StyleSheet, Image} from 'react-native';

export const Loading = () => {
   return (
   // <View style={{ flex:1, justifyContent: 'center', alignItems: 'center', }}>
   //    <ActivityIndicator size="large"/>
   //    <Text style={{ marginTop: 15 }}>Загрузка...</Text>
   //  </View>
   <View style={styles.centeredView}>
      <View style={styles.container}>
         <Image source={require('../assets/paloma.gif')} />
      </View>
   </View>
   )
}
const styles = StyleSheet.create({

   container: {
     flex: 1,
     justifyContent: 'center',
     backgroundColor: '#ecf0f1',
     padding: 8,
   },
   centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
})
