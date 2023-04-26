import { View } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import { createUser } from "../util/auth";
import { useContext, useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function SignUpScreen(){

    const[isAuthenticating,setIsAuthenticating]= useState(false);
const authCtx= useContext(AuthContext);

    async function signUpHandler({email,password}){
        setIsAuthenticating(true)

        try{
         
           const token= await createUser(email,password);

            authCtx.authenticate(token)

        }catch(error){
            Alert.alert('Authentication Failed', 'Could not login you ,please check your credentials');
            setIsAuthenticating(false) 

        }
     
      

    }

    if(isAuthenticating){
        return <LoadingOverlay message="Creating User....."/>
    }
    return (
    <AuthContent onAuthenticate={signUpHandler}/>
    );
}
export default SignUpScreen;