import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput} from 'react-native';
import { Loading } from '../components/Loading';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { event } from 'react-native-reanimated';

const ModalMenuScreen = ({navigation}) => {
const [isAuthPage, setisAuthPage] = React.useState(false);
const [isLoading, setisLoading] = React.useState(false);
const isModal = useSelector(state => state.isModal)
const dispatch = useDispatch();
const [isPassModal, setIsPassModal] = React.useState(false);
const [password, setPassword] = React.useState();
const defaultPass = '00000';
const [isPassCorrect, setIsPassCorrect] = React.useState(false);
const [modalName, setModalName] = React.useState('');
const [action, setAction] = React.useState();

  const removeAuthKey = () => {
    console.log('action', action)
    dispatch({type: "REMOVE_AUTH_KEY", payload: false})
  }

  const checkPass = () => {
    if(defaultPass == password){
      console.log('action', action)
      setIsPassCorrect(true)
    } else {
      setAction('');
      Alert.alert('Ошибка', 'неверно введен код защиты');
    }
  }

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
    if(isPassCorrect){
      if(action == 'killAuth') {
        removeAuthKey();
      }
      navigation.navigate('Auth');
     }
   }
   React.useEffect(goToAuthPage, [isPassCorrect]) 

   if(isLoading) {
    return <Loading/>
   }

  return (
    <View style={styles.centeredView}>
        <Modal
        animationType="fade"
        transparent={true}
        visible={isPassModal}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Введите код защиты</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.barCodeInput}
                placeholderTextColor="#2F80ED"
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
            </View>
            <Pressable
              style={[styles.button, styles.buttonClosePass]}
              onPress={(checkPass)}>
              <Text style={styles.textStyle}>{modalName}</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClosePass]}
              onPress={() => {
                setIsPassModal(false);
                
              }}>
              <Text style={styles.textStyle}>Отмена</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'red',
          }, 
          styles.button, styles.buttonOpen
        ]
      }
        // onPress={logout}>
        onPress={()=> {
          setModalName('Выход');
          setIsPassModal(true);
        }}>
        <Text style={styles.textStyle}>Выход</Text>
      </Pressable>
      <Pressable
          style={({pressed}) => [{
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'red',
          }, 
          styles.button, styles.buttonOpen
        ]
      }
      title="title"
        onPress={(e) => {
          setModalName('Сменить пользователя');
          setAction('killAuth');
          setIsPassModal(true);
        }}>
        <Text style={styles.textStyle}>Сменить пользователя</Text>
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
  barCodeInput:{
    height: 20,
    zIndex:111,
    color: '#2F80ED',
    fontSize:20,
    width: 150,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    textAlign: 'center',
    padding: 5,
    marginBottom: 10
  },  
  inputWrapper:{
    backgroundColor: '#219653',
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
    // flex:0.1,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 100,
    marginBottom:10,
  },
  button: {
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingVertical: 20,
    marginBottom: 20,
    elevation: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonOpenPass: {
    backgroundColor: '#F194FF',
  },
  buttonClosePass: {
    backgroundColor: '#2196F3',
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