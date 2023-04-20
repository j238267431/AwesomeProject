import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { Loading } from '../components/Loading';

const PostText = styled.Text`
   font-size: 18px;
   line-height: 24px;
`


export const FullPostScreen = ({route, navigation}) => {
   const [isLoading, setisLoading] = React.useState(true);
   const [items, setItems] = React.useState();
 
   const {id, title} = route.params;

   const fetchPosts = () => {
      setisLoading(true);
      navigation.setOptions({
         title
      })
      axios
      .get('https://643bcc76447794557360cb78.mockapi.io/articles/'+id)
      // .get("https://test2.isoftik.kz/company/api/client.php")
      .then(({ data }) => {
         console.log(data);
         setItems(data);
        console.log(id);
      })
      .catch(err => {
        console.log('err', err);
        Alert.alert('Error', 'no articles received');
      }).finally(() => {
        setisLoading(false);
      })
    }
  
    // "company/api/client.php?class=payment-result&method=handle"
  
  
    React.useEffect(fetchPosts, []) 
      if(isLoading){
        return <Loading/>
      }
      

   return (
      <View stylele={{ padding: 20 }}>
         <PostText>
            { items.title }
         </PostText>
      </View>
   )
}