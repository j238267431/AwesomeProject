import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./Home";
import { NavigationContainer } from "@react-navigation/native";
import { FullPostScreen } from "./FullPost";
import { AuthScreen } from "./Auth";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
   return (
   <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="Auth" component={AuthScreen} options={{title: 'Authorisation'}}/>
         <Stack.Screen name="Home" component={HomeScreen} options={{title: 'News'}}/>
         <Stack.Screen name="FullPost" component={FullPostScreen} options={{title: 'Article'}}/>
      </Stack.Navigator>
   </NavigationContainer>);

}