import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Users from './tabs/users';
import Setting from './tabs/setting';
import Map from './tabs/map/map';

export const Home = () => {
    const [selectTab, setSelectTab] = useState(0);
    console.log('select tab', selectTab)



    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={{ flex: 1 }}>

                {selectTab == 0 ? <Users /> : selectTab == 1 ? <Setting /> : <Map />}
            </View>
            <View

                style={{ backgroundColor: "#fff", position: 'absolute', width: responsiveWidth(90), height: responsiveHeight(8), bottom: 5, alignItems: 'center', justifyContent: 'space-around', alignSelf: 'center', flexDirection: 'row', borderRadius: 30, elevation: 11, }}>


                <View >
                    <TouchableOpacity onPress={() => setSelectTab(0)}>
                        <Icon name="person" size={30} color={selectTab == 0 ? "#000" : "lightgray"} />
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={() => setSelectTab(1)}>
                        <Icon name="settings" size={30} color={selectTab == 1 ? "#000" : "lightgray"} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity onPress={() => setSelectTab(2)}>
                        <Icon name="map" size={30} color={selectTab == 2 ? "#000" : "lightgray"} />
                    </TouchableOpacity>
                </View>


            </View>
        </SafeAreaView>




    )
}