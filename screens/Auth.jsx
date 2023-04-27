import { 
   StyleSheet, 
   Text, 
   View, 
   TextInput, 
   Alert, 
   Button,
   Dimensions,
} from 'react-native';
import styled from 'styled-components/native';

import axios from 'axios';
import React from 'react';
import { Loading } from '../components/Loading';


const Wrapper = styled.View`
   padding: 10px;
   width:100%;
   height:100%;
   display: flex;
   justify-content: center;
   align-items: center;
`;

export const AuthScreen = ({ navigation }) => {


  const [isLoading, setisLoading] = React.useState(false);
  const [items, setItems] = React.useState();
  const [name, setname] = React.useState();
  const [password, setPassword] = React.useState();
  const [isAuth, setIsAuth] = React.useState(false);
  const [isPortrait, setIsPortrait] = React.useState();
  const [error, setError] = React.useState();
  // console.log(Dimensions.get('screen'));

  const Header = styled.View`
    flex: 0.1;
    // hieght: 10px;
    width: 100%;
    background-color: #74992e;
`;

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
    // .post("https://test2.isoftik.kz/company/api/login_ajax.php",
    .post("https://test2.isoftik.kz/login_ajax.php",
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

if(isAuth){
  navigation.navigate('Home', {nameR:name});
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
})


