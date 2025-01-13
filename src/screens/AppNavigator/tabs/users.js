import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, Text, TouchableOpacity, View ,StatusBar} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";
import { responsiveFontSize, responsiveWidth, responsiveHeight } from "react-native-responsive-dimensions";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import { Loader } from "../loader";



const Users = () => {
    const navigation = useNavigation();
    // ----------------------------------------------------------------
    const [openLoader, setOpenLoader] = useState(false)

    const [users, setUsers] = useState([])
    const [id, setId] = useState('')

    const getData = async () => {
        let tempData = []
        try {
            const jsonValue = await AsyncStorage.getItem('my-key');
            const data = jsonValue != null ? JSON.parse(jsonValue) : null;
            console.log('user data', data.email)
            setId(data.userID)
            //---------------------------------------------
            await firestore()
                .collection("user")
                .where("email", "!=", data.email)
                .get()
                .then((res) => {
                    if (res.docs != []) {
                        res.docs.map((item) => {
                            tempData.push(item.data())
                        })
                    }
                    setUsers(tempData)
                    // console.log(JSON.stringify(res.docs[0].data()))
                }).catch((e) => {
                    console.log(e)
                }
                );



        } catch (e) {
            console.log(e)
        }
    };
    useEffect(() => {
        getData();
    }, [])
    // -----------------------------------------------------------------------


    console.log('userS', users)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" translucent={true} />
            

            <View style={{ backgroundColor: '#fff', width: responsiveWidth(100), padding: 15, position: 'absolute', top: 40, elevation: 5 }}>
                <Text style={{ color: '#000', fontSize: responsiveFontSize(2.5), textAlign: 'center', fontWeight: '700' }}>
                    User
                </Text>
            </View>
            <View style={{ marginTop: 100 }}>
                <View>
                    {users ? (

                        <FlatList data={users} renderItem={({ item, index }) => {

                            return (
                                <View>
                                    <TouchableOpacity activeOpacity={.8} onPress={() => navigation.navigate("chat", { data: item, id: id })}>

                                        <View style={{ width: responsiveWidth(90), backgroundColor: "#fff", alignSelf: 'center', flexDirection: 'row', margin: 5, padding: 5, alignItems: 'center', borderRadius: 10, elevation: 5 }}>
                                            <View style={{ marginLeft: 5 }}>

                                                <Icon name="user-circle-o" size={30} color='#0096FF' />
                                            </View>
                                            <Text style={{ color: '#000', fontSize: responsiveFontSize(2.5), textAlign: 'center', fontWeight: '500', padding: 10 }}>{item.name}</Text>

                                        </View>
                                    </TouchableOpacity>
                                </View>

                            )
                        }} />
                    ) : (<Text>Data not found</Text>)}
                </View>
            </View>
            <View>
                {openLoader ?
                    (<Loader />) : null

                }

            </View>
        </SafeAreaView>
    )
}
export default Users;