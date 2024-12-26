import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";
import { GiftedChat } from 'react-native-gifted-chat'
import { useNavigation,useRoute } from "@react-navigation/native";
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
       .orderBy("createdAt","desc")
       subscriber.onSnapshot(querysnapshot => {
        const allMessages = querysnapshot.docs.map(item => {
            return {
                ...item._data,
                createdAt: Date.parse(new Date())
            }
        })
        setMessagesList(allMessages)

       })

       return ()=> subscriber;
    }, [])

    const onSend = useCallback( async (messages = []) => {
        const msg = messages[0]
        const myMsg = {
            ...msg,
            sendBy :id,
            sentTo:data.userID,
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
    console.log("ID",data)
    //-------------------------------------------------


    return (
    

        <Animated.View style={{ flex: 1,backgroundColor:'#fff'}}>
            <View style={{backgroundColor:'#fff',width:responsiveWidth(100),padding:10,alignItems:'center',flexDirection:'row',elevation:5}}>
               <TouchableOpacity onPress={()=> navigation.goBack()}>

                 <Icon name="arrow-back" size={30} color='#000' />
               </TouchableOpacity>
                <Text style={{color:'#000',fontSize:responsiveFontSize(2.5),fontWeight:"600",marginLeft:10}}>{data.name}</Text>
            </View>

            <GiftedChat
                messages={messagesList}
                onSend={messages => onSend(messages)}
                user={{
                    _id: id,
                }}
            />
        </Animated.View>
    
    )
}
export default MyChat;





// import { useRoute,useNavigation } from '@react-navigation/native';
// import React,{useState,useEffect} from 'react';
// import {Text,View} from 'react-native';




// const MyChat = () => {
//     const route = useRoute();
//     const navigation = useNavigation()
   
//     const { data, id } = route.params; 
   
//     console.log("ID",id)
//     console.log("Data",data)


//     return (
//         <View style={{flex:1}}>
//             <Text style={{color:"#000",}}>USer ID : {id}</Text>

          
//         </View>
//     )
// }

// export default MyChat;
