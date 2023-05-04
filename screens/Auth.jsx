import { 
   StyleSheet, 
   Text, 
   View, 
   TextInput, 
   Alert, 
   Button,
   Dimensions,
   Modal,
   Pressable
} from 'react-native';
import styled from 'styled-components/native';

import axios from 'axios';
import React from 'react';
import { Loading } from '../components/Loading';
import { useSelector, useDispatch } from 'react-redux';


const Wrapper = styled.View`
   padding: 10px;
   width:100%;
   height:100%;
   display: flex;
   justify-content: center;
   align-items: center;
`;

export const AuthScreen = ({ navigation }) => {

  const [modalVisible, setModalVisible] = React.useState(false);
  const [isLoading, setisLoading] = React.useState(false);
  const [items, setItems] = React.useState();
  const [name, setname] = React.useState();
  const [password, setPassword] = React.useState();
  const [isAuth, setIsAuth] = React.useState(false);
  const [isPortrait, setIsPortrait] = React.useState();
  const [error, setError] = React.useState();
  const dispatch = useDispatch();
  const authKey = useSelector(state => state.authKey);



Dimensions.addEventListener('change', () => {
  var dim = Dimensions.get('screen');
  setIsPortrait(dim.height >= dim.width ? 'portrait' : 'landscape')
  // this.setState({
  //   orientation: isPortrait() ? 'portrait' : 'landscape'
  // });
  
});
console.log(isPortrait);

  const  makeAuth = () => {
    setisLoading(true);


    axios
    .post("https://test2.isoftik.kz/company/api/login_ajax.php",
    // .post("https://test2.isoftik.kz/login_ajax.php",
    {
      password:password,
      login: name,
      chk: 1,
    },
    {
      headers: {
      'Content-Type': 'multipart/form-data'
    }
   })
   //devtest2 testalm
   .then(({ data }) => {
    console.log('auth_key',data)
    // setIsAuth(data.auth)
    if(data.type == 'login'){
      dispatch({type:"SAVE_AUTH_KEY", payload: data.authkey})
      setIsAuth(true)
      setItems(data);
      setError('');
    } else {
      setIsAuth(false)
      setError(data.message);
    }
    
  })
    .catch(err => {
      console.log('err', err);
      Alert.alert('Ошибка', err);
    }).finally(() => {
      setisLoading(false);
    })
  }

  React.useEffect(
    () => {
    setIsAuth(false);
    if(isAuth){
      navigation.navigate('Home', {nameR:name});
    }
  }, [isAuth]) 


if(isLoading) {
  return <Loading/>
 }


 

if(authKey){
  console.log('authKeyAuth', authKey);
  return (
    <View style={styles.centeredView}>
      <Pressable 
        style={({pressed}) => [{
            backgroundColor: pressed ? 'rgb(210, 230, 255)' : '#219653',
          }, 
          styles.button, styles.buttonOpen
        ]}
        onPress={()=> {
          navigation.navigate("Home")
        }}

      ><Text style={styles.textStyle}>Нажмите чтобы проверить цену товара по штрихкоду</Text></Pressable>
    </View>
  )
}



  return (
    <>
    
    <Wrapper>
    <View style={styles.inputWrapper}>

      <TextInput
         style={styles.barCodeInput}
         placeholderTextColor="#2F80ED"
         placeholder="Login"
         value={name}
         onChangeText={setname}
      />
      <TextInput
         style={styles.barCodeInput}
         placeholderTextColor="#2F80ED"
         placeholder="Password"
         value={password}
         onChangeText={setPassword}
         secureTextEntry={true}
      />
    </View>
    <Text style={styles.errorText}>{error}</Text>
      <Button
        onPress={makeAuth}
         title="Войти"
      />
   </Wrapper>
   </>
  );

  
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  
  errorText:{
    color: 'red',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20
  },  
  barCodeInput:{
    height: 20,
    zIndex:111,
    color: '#2F80ED',
    fontSize:20,
    width: 250,
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
    width: 300,
    height: 200,
    marginBottom:10,
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
  
})


