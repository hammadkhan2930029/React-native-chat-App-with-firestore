import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, SafeAreaView, Image, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, StatusBar } from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { Formik } from "formik";
import { object, string, number, date, InferType } from 'yup';
import firestore from "@react-native-firebase/firestore";
import auth from '@react-native-firebase/auth';
import { useToast } from 'react-native-toast-notifications';
import uuid from 'react-native-uuid'


const validationSchema = object({
    name: string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
    email: string().email("Invalid email").required("Email is required"),
    mobileNo: string()
        .matches(/^(\+92|92|0)(\d{10})$/, 'Mobile Number is not valid')
        .required('Mobile number is required'),
    password: string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: string()
        .min(6, "Password must be at least 6 characters")
        .required("Confirm Password is required"),
});



const Register = () => {
    const navigation = useNavigation();
    const toast = useToast();
    // console.log("UID : ", uuid.v4())

    // ---------------------------------------------------------------------

    const signUp = async (value) => {
        console.log("user data", value)
        try {
            const userId = uuid.v4()
            console.log("UID : ", userId)

            // ------------------------------------------------------------------------
            const userCredential = await auth().createUserWithEmailAndPassword(
                value.email,
                value.password
            ).then(() => {
                console.log('User account created & signed in!')
                toast.show('User account created & signed in!', {
                    type: "success",
                    placement: "top",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
            }).catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!')
                    toast.show('That email address is already in use!', {
                        type: "warning",
                        placement: "top",
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in ",
                    });

                }

                if (error.code === 'auth/invalid-email') {

                    toast.show('That email address is invalid!', {
                        type: "danger",
                        placement: "top",
                        duration: 4000,
                        offset: 30,
                        animationType: "slide-in ",
                    });

                }

                console.error(error);

            })
            // -------------------------------------------------------------------------
          
            await firestore().collection('user').doc(userId).set({
                name: value.name,
                email: value.email,
                mobileNo: value.mobileNo,
                password: value.password,
                confirmPassword: value.confirmPassword,
                userID: userId,
                createdAt: firestore.FieldValue.serverTimestamp(),

            }).then(() => {

                toast.show('User registered and data saved in Firestore!', {
                    type: "success",
                    placement: "top",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
                navigation.replace("login")
            }).catch((error) => {
                console.log("error", error)
                toast.show(error, {
                    type: "warning",
                    placement: "top",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
            })

            //--------------------------------------------------------------------------
        } catch (error) {

            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                toast.show('That email address is already in use!', {
                    type: "warning",
                    placement: "top",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in",
                });
            } else if (error.code === 'auth/invalid-email') {
                toast.show('That email address is invalid!', {
                    type: "warning",
                    placement: "top",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in ",
                });
            } else if (error.code === 'auth/weak-password') {
                toast.show('Password should be at least 6 characters!', {
                    type: "warning",
                    placement: "top",
                    duration: 4000,
                    offset: 30,
                    animationType: "slide-in ",
                });
            }
            console.log("firestore Error", error)

        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#fff" translucent={true} /> */}


            <ScrollView>
                <View>

                    <Image style={{ width: responsiveWidth(50), alignSelf: 'center', marginTop: 20 }} source={require("../../image/chat.png")} />
                    <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(3), color: "#000", fontWeight: 700 }}>Sign Up</Text>
                </View>
                <View style={{ width: responsiveWidth(80), alignSelf: 'center' }}>
                    <Formik
                        initialValues={{
                            name: "",
                            email: "",
                            mobileNo: "",
                            password: "",
                            confirmPassword: ""
                        }}
                        onSubmit={(values, { resetForm }) => (
                        
                            signUp(values),
                            resetForm()
                        )}
                        validateOnMount={true}
                        validationSchema={validationSchema}
                        validate={(values) => {
                            const errors = {};
                            if (!values.password) {
                                errors.password = 'Password is required';
                            }
                            if (!values.confirmPassword) {
                                errors.confirmPassword = 'Confirm Password is required';
                            } else if (values.password !== values.confirmPassword) {
                                errors.confirmPassword = 'Passwords do not match';
                            }
                            return errors;
                        }}
                    >

                        {({ values, handleBlur, handleSubmit, errors, handleChange, isValid, touched }) => (
                            <View>


                                <View>

                                    <TextInput style={style.input}
                                        placeholder="Name"
                                        placeholderTextColor="gray"
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                    />
                                    {touched.name && errors.name && (
                                        <Text style={{ color: 'red' }}>{errors.name}</Text>
                                    )}
                                </View>
                                <View>

                                    <TextInput style={style.input}
                                        placeholder="Email"
                                        placeholderTextColor="gray"
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        keyboardType="email-address"
                                    />
                                    {touched.email && errors.email && (
                                        <Text style={{ color: 'red' }}>{errors.email}</Text>
                                    )}
                                </View>
                                <View>

                                    <TextInput style={style.input}
                                        placeholder="Mobile no"
                                        placeholderTextColor="gray"
                                        value={values.mobileNo}
                                        onChangeText={handleChange('mobileNo')}
                                        onBlur={handleBlur('mobileNo')}
                                        keyboardType="numeric"

                                    />
                                    {touched.mobileNo && errors.mobileNo && (
                                        <Text style={{ color: 'red' }}>{errors.mobileNo}</Text>
                                    )}
                                </View>
                                <View>

                                    <TextInput style={style.input}
                                        placeholder="password"
                                        placeholderTextColor="gray"
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        secureTextEntry={true}


                                    />
                                    {touched.password && errors.password && (
                                        <Text style={{ color: 'red' }}>{errors.password}</Text>
                                    )}
                                </View>
                                <View>

                                    <TextInput style={style.input}
                                        placeholder="Confirm password"
                                        placeholderTextColor="gray"
                                        value={values.confirmPassword}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        secureTextEntry={true}
                                    />
                                </View>
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
                                )}
                                <View>
                                    <TouchableOpacity disabled={!isValid} activeOpacity={.5} onPress={handleSubmit}>
                                        <View style={{ backgroundColor: isValid ? '#000' : 'gray', alignSelf: 'center', width: responsiveWidth(80), marginTop: 40, borderRadius: 10 }}>
                                            <Text style={{ textAlign: 'center', fontWeight: 600, fontSize: responsiveFontSize(2.5), color: "#fff", padding: 5, letterSpacing: 2 }}>sign up</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        )}
                    </Formik>

                </View>


            </ScrollView>

        </SafeAreaView>

    )
}
const style = StyleSheet.create({
    input: {

        width: responsiveWidth(80),
        padding: 15,
        borderBottomColor: 'gray',
        borderBottomWidth: .5,
        color: 'black',
        marginTop: 10

    }
})

export default Register;