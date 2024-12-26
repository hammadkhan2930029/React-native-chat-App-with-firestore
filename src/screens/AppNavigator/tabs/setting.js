import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";

const Setting = () => {
    return (
          <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
       
                   <View style={{ backgroundColor: '#fff', width: responsiveWidth(100), padding: 15, position: 'absolute', top: 40, elevation: 5 }}>
                       <Text style={{ color: '#000', fontSize: responsiveFontSize(2.5), textAlign: 'center', fontWeight: '700' }}>
                           Settings
                       </Text>
                   </View>
               </SafeAreaView>
    )
}
export default Setting;