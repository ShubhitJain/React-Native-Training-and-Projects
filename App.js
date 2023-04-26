import { StatusBar } from 'expo-status-bar';
import IconButton from './components/ui/IconButton';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from'@react-navigation/native-stack'
import { Colors } from './constants/styles';
import LoginScreen from './screens/LoginScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack=createNativeStackNavigator();

function AuthStack(){
  return(
    <Stack.Navigator
    screenOptions={{
      headerStyle:{backgroundColor:Colors.primary500},
      headerTintColor:'white',
      contentStyle:{backgroundColor:Colors.primary100}
    }}>
      <Stack.Screen name="Login" component={LoginScreen}/>

      <Stack.Screen name="Signup" component={SignUpScreen}/>

    </Stack.Navigator>
  );

}

function AuthenticatedStack(){
  const authCtx=useContext(AuthContext);
  return(
    <Stack.Navigator screenOptions={{
      headerStyle:{backgroundColor:Colors.primary500},
      headerTintColor:'white',
      contentStyle:{backgroundColor:Colors.primary100}

    }}>

<Stack.Screen name="Welcome" component={WelcomeScreen} options={{
  headerRight:({tintColor})=> <IconButton icon="exit" color={tintColor} size={24} onPress={authCtx.logout}/>
}}/>

    </Stack.Navigator>
  );
}
function Navigation(){
  const authCtx= useContext(AuthContext);

  return (
   
    <NavigationContainer>
      {!authCtx.isAuthenticated &&  <AuthStack/>}
      {authCtx.isAuthenticated && <AuthenticatedStack/>}
    </NavigationContainer>
    
  );
}

function Root(){
  const[isTryingLogin,SetIsTryingLogin]=useState(true);
  const authCtx=useContext(AuthContext);
  useEffect(()=>{
    async function fetchToken(){
   const storedToken= await AsyncStorage.getItem('token');
        if(storedToken){
            authCtx.authenticate(storedToken);
      }
      SetIsTryingLogin(false)

}
    fetchToken(); 
 },[]);
 return <Navigation />

 

if(isTryingLogin){
  return <AppLoading />
}
}


export default function App() {



  return (
    <>
    <StatusBar style='light'/>
    <AuthContextProvider >
    <Root />
    </AuthContextProvider>
    </>
   
  );
}


