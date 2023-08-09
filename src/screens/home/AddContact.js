import { View, Text, TouchableOpacity, Modal, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import { COLORS, FONTS, SIZES, } from '../../../constants';
import { AntDesign, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';


const AddContact = ({ navigation }) => {

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
                            marginBottom: 26

                        }}>
                            <FontAwesome5 name="user" size={26} color="#111" style={{ marginHorizontal: 10 }} />

                            <TextInput
                                placeholder='First name'
                                placeholderTextColor={COLORS.secondaryGray}
                                keyboardType='text'
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
                            marginBottom: 26,
                            marginHorizontal: 22

                        }}>
                            <TextInput
                                placeholder='Last name'
                                placeholderTextColor={COLORS.secondaryGray}
                                keyboardType='text'
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
                            />
                        </View>

                        <Button
                            title="Save"
                            filled
                            onPress={() => navigation.navigate('BottomTabNavigation')}
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