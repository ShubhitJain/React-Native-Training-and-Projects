import { Alert, View } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import { useContext, useState } from "react";
import { login } from "../util/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function LoginScreen(){
    const[isAuthenticating,setIsAuthenticating]= useState(false);
   const authCtx=useContext(AuthContext);
    async function loginHandler({email,password}){
        setIsAuthenticating(true)
        try{
          const token=await login(email,password);
          authCtx.authenticate(token);


        }catch(error){
            Alert.alert('Authentication Failed', 'Could not login you ,please check your credentials');
            setIsAuthenticating(false)

        }
       
      

    }

    if(isAuthenticating){
        return <LoadingOverlay message="LOG YOU IN....."/>
    }

    return (
        <AuthContent isLogin onAuthenticate={loginHandler}/>
    );
}
export default LoginScreen