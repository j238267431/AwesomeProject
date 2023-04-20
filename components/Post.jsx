import styled from 'styled-components/native';


const PostView = styled.View`
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: (rgba(0,0,0,0.1))
  border-bottom-style: solid;
`;

const PostImage = styled.Image`
  width: 100px;
  height: 100px;
`;

const PostTitle = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: black;
`;


export const Post = ({title}) => {
   return (
      <PostView>
         <PostTitle>{title}</PostTitle>   
      </PostView>
   )
      
}
