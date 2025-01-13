import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";

const Setting = () => {
    const navigation = useNavigation();
    const toast = useToast();
    const logOut = async () => {
        try {
            await AsyncStorage.clear()
            toast.show('Log out', {
                type: "success",
                placement: "bottom",
                duration: 4000,
                offset: 30,
                animationType: "slide-in",
            });
            navigation.replace("login")

        } catch (e) {
            console.log("Try catch error", e)
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>

            <View style={{ backgroundColor: '#fff', width: responsiveWidth(100), padding: 15, elevation: 5 ,position:'absolute',top:40}}>
                <Text style={{ color: '#000', fontSize: responsiveFontSize(2.5), textAlign: 'center', fontWeight: '700' }}>
                    Settings
                </Text>
            </View>
            <TouchableOpacity style={{ marginTop: 120 }} onPress={() => logOut()}>
                <View style={{ width: responsiveWidth(60), alignSelf: 'center', borderRadius: 10, backgroundColor: "#fff", elevation: 5 }}>

                    <Text style={{ padding: 10, color: '#000', fontSize: responsiveFontSize(2.5), textAlign: 'center', fontWeight: '700' }}>Log Out</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default Setting;