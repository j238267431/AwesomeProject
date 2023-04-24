import { 
   StyleSheet, 
   Text, 
   Image, 
   View, 
   TextInput, 
   Alert, 
   FlatList, 
   ActivityIndicator, 
   RefreshControl, 
   TouchableOpacity,
   Button,
   Dimensions,
} from 'react-native';
import styled from 'styled-components/native';
import { Post } from '../components/Post';
import axios from 'axios';
import React from 'react';
import { Loading } from '../components/Loading';
import {HomeScreen} from './Home';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Wrapper = styled.View`
   padding: 10px;
   width:100%;
   height:100%;
   display: flex;
   justify-content: center;
   align-items: center;
`;
const TextInputAuth = styled.TextInput`
   border: 2px solid black;
   width: 100%;
   padding: 10px;
   margin-bottom: 10px;
`;

const ButtonAuth = styled.Button`
   width: 100%;
   background: black;
   border: 1px solid black;
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
    console.log('authName', name)
    console.log('password', password);
    axios
   //  .get('https://643bcc76447794557360cb78.mockapi.io/articles')
    .post("https://test2.isoftik.kz/company/api/pricecheckerAuth.php?class=ChargeanywhereApi&method=handle", 
    {
      password:password,
      name: name
   },
    {
      headers: {
      'Content-Type': 'multipart/form-data'
    }
   })
    .then(({ data }) => {
      setIsAuth(data.auth)
      setItems(data);
      setError(data.errors);
    })
    .catch(err => {
      console.log('err', err);
      Alert.alert('Ошибка', err);
    }).finally(() => {
      setisLoading(false);
    })
  }

  console.log('errorsLenth', error)

  // "company/api/client.php?class=payment-result&method=handle"

  React.useEffect(
    () => {
    setIsAuth(false);
    if(isAuth){
      // return <HomeScreen
      //   name={name}
      //   password={password}
      // />
      // return <Navigation/>
      navigation.navigate('Home', {nameR:name});
    }
  }, [isAuth]) 
  // React.useEffect(fetchPosts, []) 
if(isLoading) {
  return <Loading/>
 }

// if(isAuth){
//   // return <HomeScreen
//   //   name={name}
//   //   password={password}
//   // />
//   // return <Navigation/>
//   navigation.navigate('Home', {nameR:name});
// }


  return (
    <>
    
    <Wrapper>
    <View style={styles.inputWrapper}>
      <TextInput
         style={styles.barCodeInput}
         placeholderTextColor="#2F80ED"
         placeholder="Name"
         value={name}
         onChangeText={setname}
      />
      <TextInput
         style={styles.barCodeInput}
         placeholderTextColor="#2F80ED"
         placeholder="Password"
         value={password}
         onChangeText={setPassword}
      />
      <Text style={styles.errorText}>{error}</Text>
    </View>


    
      <Button
        //  onPress={makeAuth}
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


