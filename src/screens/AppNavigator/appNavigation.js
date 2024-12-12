import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./splash";
import Login from "./login";
import Register from "./register";

const Stack = createStackNavigator();
const AppNavigator = ()=>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}}/>
                <Stack.Screen name="login" component={Login} options={{headerShown:false}}/>
                <Stack.Screen name="register" component={Register} options={{headerShown:false}}/>


            </Stack.Navigator>
            
        </NavigationContainer>
    )

}
export default AppNavigator

