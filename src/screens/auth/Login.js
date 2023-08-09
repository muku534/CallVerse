import { View, Text, Image, Pressable, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
// import COLORS from '../../../constants/colors';
import { COLORS, FONTS, SIZES, } from '../../../constants';
import { Ionicons } from "@expo/vector-icons";
// import Checkbox from "expo-checkbox"
import Button from '../../components/Button';
import { LinearGradient } from "expo-linear-gradient";

const Login = ({ navigation }) => {
    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }} >

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'column', marginHorizontal: 22, height: "30%" }}>
                <Image source={require("../../../assets/images/9233852_4112338.jpg")} style={{ width: SIZES.width * 0.8, height: SIZES.width * 0.8, marginVertical: 10 }} />
            </View>
            <View style={{ flex: 1, marginHorizontal: 22, }}>
                <View style={{ marginVertical: 22 }}>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        marginVertical: 12,
                        color: COLORS.black
                    }}>
                        Hi Welcome Back ! 👋
                    </Text>

                    <Text style={{
                        fontSize: 16,
                        color: COLORS.black
                    }}>Hello again you have been missed!</Text>
                </View>

                <View style={{ marginBottom: 12 }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '400',
                        marginVertical: 8
                    }}>Phone Number</Text>

                    <View style={{
                        width: "100%",
                        height: 48,
                        borderColor: COLORS.black,
                        borderWidth: 1,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingLeft: 22
                    }}>
                        <TextInput
                            maxLength={10}
                            placeholder='Enter your Phone Number'
                            placeholderTextColor={COLORS.black}
                            keyboardType='numeric'
                            style={{
                                width: "100%"
                            }}
                        />
                    </View>
                </View>


                <Button
                    title="Login"
                    filled
                    onPress={() => navigation.navigate("AddProfile")}
                    style={{
                        marginTop: 15,
                        marginBottom: 4,
                    }}
                />

                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginVertical: 15,
                }}>
                    <Text style={{ fontSize: 16, color: COLORS.black }}>Don't have an account ? </Text>
                    <TouchableOpacity style={{
                        justifyContent: "center", alignItems: "flex-end",
                    }} >
                        <Text style={{ ...FONTS.body4, color: COLORS.green }}>
                            Generate New Number
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>

    )
}

export default Login