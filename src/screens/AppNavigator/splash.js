import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Text, View, SafeAreaView, Image } from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";


const Splash = () => {
    const navigation = useNavigation();
    useEffect(()=>{
        setTimeout(() => {
            navigation.replace("login")
            
        }, 2000);

    },[])
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Image style={{ width: responsiveWidth(70), alignSelf: 'center', marginTop: 100 }} source={require("../../image/chat.png")} />
            <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(3), fontWeight: 600 ,color:'#000'}}>CHAT APP</Text>

        </View>

    )
}

export default Splash;