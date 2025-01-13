import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import { GiftedChat,Bubble, Avatar } from 'react-native-gifted-chat'
import { useNavigation, useRoute } from "@react-navigation/native";
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore, { query } from '@react-native-firebase/firestore'



const MyChat = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { data, id } = route.params;

    const [messagesList, setMessagesList] = useState([])
    useEffect(() => {
        const subscriber = firestore()
            .collection("chat")
            .doc(id + data.userID)
            .collection("message")
            .orderBy("createdAt", "desc")
        subscriber.onSnapshot(querysnapshot => {
            const allMessages = querysnapshot.docs.map(item => {

                return {
                    ...item._data,
                    createdAt: Date.parse(new Date())
                }
            })
            setMessagesList(allMessages)

        })

        return () => subscriber;
    }, [])

    const onSend = useCallback(async (messages = []) => {
        const msg = messages[0]
        const myMsg = {
            ...msg,
            sendBy: id,
            sentTo: data.userID,
            createdAt : Date.parse(msg.createdAt)
        }
        setMessagesList(previousMessages =>
            GiftedChat.append(previousMessages, myMsg),
        );
        firestore()
            .collection("chat")
            .doc("" + id + data.userID)
            .collection("message")
            .add(myMsg)
        //-----------------
        firestore()
            .collection("chat")
            .doc("" + data.userID + id)
            .collection("message")
            .add(myMsg)
    }, [])
    console.log("ID", data)
    //-------------------------------------------------


    return (


        <Animated.View style={{ flex: 1, backgroundColor: '#fff' }}>
            <View style={{ backgroundColor: '#fff', width: responsiveWidth(100), padding: 10, alignItems: 'center', flexDirection: 'row', elevation: 5 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>

                    <Icon name="arrow-back" size={30} color='#000' />
                </TouchableOpacity>
                <Text style={{ color: '#000', fontSize: responsiveFontSize(2.5), fontWeight: "600", marginLeft: 10 }}>{data.name}</Text>
            </View>

            <GiftedChat
                messages={messagesList}
                onSend={messages => onSend(messages)}
                user={{
                    _id: id,
                }}
                renderAvatar={null}
                renderBubble={props => {
                    return (
                        <Bubble
                            {...props}
                            wrapperStyle={{
                                left: { // Samne wale ke msg ka style
                                    marginVertical: 0, // Remove extra space
                                    padding: 5,
                                    backgroundColor: '#f0f0f0', // Customize background
                                },
                                right: { // Apke msg ka style
                                    marginVertical: 0, // Remove extra space
                                    padding: 5,
                                    backgroundColor: '#0078FF', // Customize background
                                },
                            }}
                        />
                    );
                }}
            />

        </Animated.View>

    )
}
export default MyChat;






