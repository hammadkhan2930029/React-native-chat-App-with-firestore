import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, Image, StatusBar } from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Splash = () => {
    const navigation = useNavigation();
    const [userdata, setuserData] = useState()


    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('my-key');
            const data = jsonValue != null ? JSON.parse(jsonValue) : null;
          
            // setuserData(data)
            console.log('id',data)
            if (data !== null) {
                navigation.navigate("home")
            } else {
                navigation.navigate("login")
            }
        } catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        setTimeout(() => {

            getData()
        }, 2000);
    }, [])
    // console.log("user", userdata)
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" translucent={true} />
            <Image style={{ width: responsiveWidth(70), alignSelf: 'center', marginTop: 100 }} source={require("../../image/chat.png")} />
            <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(3), fontWeight: 600, color: '#000' }}>CHAT APP</Text>

        </View>

    )
}

export default Splash;