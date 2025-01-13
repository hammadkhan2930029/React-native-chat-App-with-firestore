import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "./splash";
import Login from "./login";
import Register from "./register";
import { ToastProvider } from 'react-native-toast-notifications'
import { Home } from "./home";
import MyChat from "./tabs/chat";
import Users from "./tabs/users";
import Setting from "./tabs/setting";

const Stack = createStackNavigator();
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <ToastProvider>

                <Stack.Navigator>
                    <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                    <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
                    <Stack.Screen name="chat" component={MyChat} options={{ headerShown: false }} />
                    <Stack.Screen name="user" component={Users} options={{ headerShown: false }} />
                    <Stack.Screen name="setting" component={Setting} options={{ headerShown: false }} />

                </Stack.Navigator>
            </ToastProvider>

        </NavigationContainer>
    )

}
export default AppNavigator

