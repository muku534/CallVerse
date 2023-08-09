import { View, Text, Pressable, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { LinearGradient } from "expo-linear-gradient";
import COLORS from '../../../constants/colors';
import { FONTS, SIZES, images } from '../../../constants';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Welcome = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [randomNumber, setRandomNumber] = useState(null);
    const [generatedNumber, setGeneratedNumber] = useState('');
    
    const generateRandomNumber = () => {
        const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
        return randomNumber.toString();
    };

    // Function to store the generated number and flag in AsyncStorage
    const storeNumber = async (number) => {
        try {
            await AsyncStorage.setItem('randomNumber', number);
            await AsyncStorage.setItem('generatedNumber', 'true');
            console.log('Number stored successfully.');
        } catch (error) {
            console.log('Error storing number:', error);
        }
    };

    // Function to check if the number has already been generated for the user
    const checkIfNumberGenerated = async () => {
        try {
            const flag = await AsyncStorage.getItem('generatedNumber');
            if (flag === 'true') {
                const storedNumber = await AsyncStorage.getItem('randomNumber');
                setRandomNumber(storedNumber);
                setGeneratedNumber(true);
            }
        } catch (error) {
            console.log('Error checking if number is generated:', error);
        }
    };

    // Function to generate a new number, show it in an alert, store it, and navigate to the profile page
    const handleGenerateNumber = () => {
        if (!generatedNumber) {
            const newNumber = generateRandomNumber();
            setRandomNumber(newNumber);
            setModalVisible(true);
            Alert.alert('Your Random Number ', newNumber, [
                {
                    text: 'OK',
                    onPress: () => {
                        storeNumber(newNumber);
                        setGeneratedNumber(true);
                        navigation.navigate('Login');
                    },
                },
            ]);
        } else {
            Alert.alert('Number Already Generated', 'You have already generated a number.');
        }
    };

    // Load the stored number and check the flag on component mount
    useEffect(() => {
        checkIfNumberGenerated();
    }, []);

    // Function to delete the stored number and flag from AsyncStorage
    const deleteNumber = async () => {
        try {
            await AsyncStorage.removeItem('randomNumber');
            await AsyncStorage.removeItem('generatedNumber');
            console.log('Number deleted successfully.');
            setRandomNumber(null);
            setGeneratedNumber(false);
        } catch (error) {
            console.log('Error deleting number:', error);
        }
    };

    // Function to handle the delete action
    const handleDeleteNumber = () => {
        Alert.alert('Delete Number', 'Are you sure you want to delete the number?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Delete',
                onPress: deleteNumber,
            },
        ]);
    };

    return (
        <LinearGradient
            style={{
                flex: 1
            }}
            colors={[COLORS.secondary, COLORS.primary]}
        >
            <View style={{ flex: 1 }}>
                <View>
                    <Image
                        source={require("../../../assets/images/hero1.jpg")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 10,
                            transform: [
                                { translateX: 20 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../../../assets/images/hero3.jpg")}
                        style={{
                            height: 100,
                            width: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: -30,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-5deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../../../assets/images/hero3.jpg")}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 20,
                            position: "absolute",
                            top: 130,
                            left: -50,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "15deg" }
                            ]
                        }}
                    />

                    <Image
                        source={require("../../../assets/images/hero2.jpg")}
                        style={{
                            height: 200,
                            width: 200,
                            borderRadius: 20,
                            position: "absolute",
                            top: 110,
                            left: 100,
                            transform: [
                                { translateX: 50 },
                                { translateY: 50 },
                                { rotate: "-15deg" }
                            ]
                        }}
                    />
                </View>

                {/* content  */}

                <View style={{
                    paddingHorizontal: 22,
                    position: "absolute",
                    top: 400,
                    width: "100%"
                }}>
                    <Text style={{
                        fontSize: 50,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>Let's Get</Text>
                    <Text style={{
                        fontSize: 46,
                        fontWeight: 800,
                        color: COLORS.white
                    }}>Started</Text>

                    <View style={{ marginVertical: 12 }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                            marginVertical: 4
                        }}>Connect with each other with chatting</Text>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white,
                        }}>Calling, Enjoy Safe and private texting</Text>
                    </View>

                    <Button
                        title="Join Now"
                        onPress={handleGenerateNumber}
                        style={{
                            marginTop: 22,
                            width: "100%"
                        }}
                    />

                    {/* <Button onPress={handleDeleteNumber} title="Delete Number" /> */}

                    <View style={{
                        flexDirection: "row",
                        marginTop: 12,
                        justifyContent: "center"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: COLORS.white
                        }}>Already have an account ?</Text>
                        <Pressable
                            onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{
                                fontSize: 16,
                                color: COLORS.white,
                                fontWeight: "bold",
                                marginLeft: 4
                            }}>Login</Text>
                        </Pressable>

                    </View>
                </View>
            </View>
        </LinearGradient>
    )
}


export default Welcome