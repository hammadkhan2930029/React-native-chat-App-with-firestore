import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, View, SafeAreaView, Image, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { Formik } from "formik";
import { object, string, number, date, InferType } from 'yup'


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

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
                        onSubmit={(values) => (
                            console.log(values))}
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

        </View>

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