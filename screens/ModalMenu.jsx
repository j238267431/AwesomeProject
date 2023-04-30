import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { Loading } from '../components/Loading';
import axios from 'axios';

const ModalMenuScreen = ({navigation}) => {
const [isAuthPage, setisAuthPage] = React.useState(false);
const [isLoading, setisLoading] = React.useState(false);

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
  //  devtest2
  // testalm
  // smp
   const goToAuthPage = () => {
    if(isAuthPage){
      navigation.navigate('Auth');
     }
   }
   React.useEffect(goToAuthPage, [isAuthPage]) 

   if(isLoading) {
    return <Loading/>
   }

  return (
    <View style={styles.centeredView}>
      <Pressable
        style={({pressed}) => [{
          backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#219653',
        }, 
        styles.button, styles.buttonOpen
      ]
    }
        onPress={()=> {
          navigation.goBack()
        }}>
        <Text style={styles.textStyle}>Назад</Text>
      </Pressable>
      <Pressable
          style={({pressed}) => [{
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#219653',
          }, 
          styles.button, styles.buttonOpen
        ]
      }
        onPress={logout}>
        <Text style={styles.textStyle}>Выход</Text>
      </Pressable>
    </View>
  );
};

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
    marginBottom: 20,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ModalMenuScreen;