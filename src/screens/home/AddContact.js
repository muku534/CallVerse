import { View, Text, TouchableOpacity, Modal, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState,useEffect } from 'react';
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import { COLORS, FONTS, SIZES, } from '../../../constants';
import { AntDesign, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../auth/Storage'
import axios from "axios"

const AddContact = ({ navigation }) => {
    const [contactName, setContactName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUserData();
            if (user) {
                setUserData(user);
                console.log("This is the userData:",)
            }
        }

        fetchUserData();
    }, []);


    const handleSaveContact = async () => {
        setIsLoading(true);

        try {

            // User exists, proceed to add the contact
            const Response = await axios.post(`${process.env.REACT_APP_API_URL}/AddContacts`, {
                randomNumber: phoneNumber,
                userRandomNumber: userData.randomNumber,
                contactName
            });

            console.log(Response.data)
        } catch (error) {
            console.log(error.message)
        }
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <PageTitle title="New Contact" onPress={() => navigation.navigate("Contact")} />
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ width: '100%', paddingHorizontal: 22, paddingVertical: 0, }}>
                        {/* <Text style={{
                            fontSize: 16,
                            fontWeight: '400',
                            marginTop: 22,
                        }}>Display name</Text> */}

                        <View style={{
                            width: "100%",
                            height: 48,
                            marginVertical: 12,
                            // borderColor: COLORS.black,
                            // borderWidth: 1,
                            // borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: 'row',
                            marginBottom: 26,
                            marginHorizontal: 22

                        }}>
                            <TextInput
                                placeholder='Name'
                                placeholderTextColor={COLORS.secondaryGray}
                                keyboardType='default'
                                style={{
                                    width: "90%",
                                    height: 54,
                                    fontSize: 14,
                                    backgroundColor: COLORS.secondaryWhite,
                                    paddingLeft: 22,
                                    borderRadius: SIZES.padding
                                    ,
                                    paddingLeft: SIZES.padding
                                    ,
                                    color: '#111'
                                }}
                                value={contactName}
                                onChangeText={setContactName}
                            />
                        </View>

                        <View style={{
                            width: "100%",
                            height: 48,
                            marginVertical: 12,
                            // borderColor: COLORS.black,
                            // borderWidth: 1,
                            // borderRadius: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: 'row',

                        }}>
                            <Ionicons name="md-call-outline" size={26} color="#111" style={{ marginHorizontal: 10 }} />

                            <TextInput
                                placeholder='Enter the Number '
                                placeholderTextColor={COLORS.secondaryGray}
                                keyboardType='numeric'
                                style={{
                                    width: "90%",
                                    height: 54,
                                    fontSize: 14,
                                    backgroundColor: COLORS.secondaryWhite,
                                    paddingLeft: 22,
                                    borderRadius: SIZES.padding
                                    ,
                                    paddingLeft: SIZES.padding
                                    ,
                                    color: '#111'
                                }}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                            />
                        </View>

                        <Button
                            title="Save"
                            filled
                            onPress={handleSaveContact}
                            isLoading={isLoading}
                            style={{
                                marginTop: 15,
                                // marginVertical: 55,
                                marginBottom: 4,
                            }}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default AddContact