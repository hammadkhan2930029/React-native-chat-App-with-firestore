import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, View, SafeAreaView, Image, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
} from "react-native-responsive-dimensions";
import { Formik } from "formik";
import { object, string, number, date, InferType } from 'yup';


const validationSchema = object({
    email: string()
        .email("Invalid email")
        .required("Email is required"),

    password: string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),

});


const Login = () => {

    const navigation = useNavigation();
    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>

            <ScrollView>


                <View>

                    <Image style={{ width: responsiveWidth(50), alignSelf: 'center', marginTop: 20 }} source={require("../../image/chat.png")} />
                    <Text style={{ textAlign: 'center', fontSize: responsiveFontSize(3), color: "#000", fontWeight: 700 }}>LOG IN</Text>
                </View>
                <View style={{ width: responsiveWidth(80), alignSelf: 'center' }}>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => {
                            console.log(values)
                        }}
                        validationSchema={validationSchema}
                        validateOnMount={true}
                    >
                        {({ isValid, values, errors, handleBlur, handleSubmit, handleChange, touched }) => (
                            <View>


                                <View>

                                    <TextInput style={style.input}
                                        placeholder="Email"
                                        placeholderTextColor="gray"
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                    />
                                    {touched.email && errors.email && (
                                        <Text style={{ color: "red" }}>
                                            {errors.email}
                                        </Text>
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
                                    {touched.email && errors.email && (
                                        <Text style={{ color: "red" }}>
                                            {errors.email}
                                        </Text>
                                    )}
                                </View>
                                <View>
                                    <TouchableOpacity disabled={!isValid} activeOpacity={.5} onPress={handleSubmit}>
                                        <View style={{ backgroundColor: isValid ? '#000' : "gray", alignSelf: 'center', width: responsiveWidth(80), marginTop: 40, borderRadius: 10 }}>
                                            <Text style={{ textAlign: 'center', fontWeight: 600, fontSize: responsiveFontSize(2.5), color: "#fff", padding: 5, letterSpacing: 2 }}>LOG IN</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    </Formik>


                    <View>
                        <TouchableOpacity activeOpacity={.5} onPress={() => navigation.navigate("register")}>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ textAlign: 'center', fontWeight: 600, fontSize: responsiveFontSize(2), color: "gray", padding: 5 }}>Register Now</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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

export default Login;