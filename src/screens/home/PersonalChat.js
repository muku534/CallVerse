import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { COLORS, FONTS } from '../../../constants'
import { StatusBar } from 'expo-status-bar'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'

const PersonalChat = ({ route, navigation }) => {
    const { userName, userImg } = route.params;

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hey Buddy 🖐',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: userImg,
                },
            },
        ]);
    }, []);

    const onSend = useCallback((newMessages) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        );
    }, []);

    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View style={{
                    height: 36,
                    alignItems: "center",
                    justifyContent: "center",
                    width: 40,
                    borderRedius: 25,
                    backgroundColor: '#4526d0',
                    marginRight: 5,
                    marginBottom: 5
                }}>
                    <FontAwesome name='send' size={15} color={COLORS.white} />
                </View>
            </Send>
        )
    }

    const renderBubble = (props) => {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#5436da'
                    }
                }}
                textStyle={{
                    color: COLORS.white
                }}
            />
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, color: COLORS.secondaryWhite }}>
            <StatusBar style='light' backgroundColor={COLORS.white} />
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 22,
                backgroundColor: COLORS.white,
                marginVertical: 22,
                height: 60
            }}>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Contacts")} >
                        <MaterialIcons name='keyboard-arrow-left'
                            size={24} />
                    </TouchableOpacity>
                    <Image
                        source={userImg}
                        resizeMode="contain"
                        style={{
                            height: 35,
                            width: 35,
                            borderRadius: 25,
                        }}
                    />
                    <Text style={{ ...FONTS.h4, marginLeft: 8 }}>
                        {userName}
                    </Text>
                </View>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <TouchableOpacity onPress={() => console.log("search")}
                        style={{ margin: 8 }}
                    >
                        <MaterialIcons name='search'
                            size={24}
                            color={COLORS.black} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => console.log("menu")}
                        style={{ margin: 8 }}
                    >
                        <MaterialIcons name='menu'
                            size={24}
                            color={COLORS.black} />
                    </TouchableOpacity>
                </View>
            </View>

            <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{
                    _id: 1
                }}
                renderBubble={renderBubble}
                alwaysShowSend
                renderSend={renderSend}
                scrollToBottom
                textInputStyle={{
                    borderRedius: 22,
                    borderWidthh: 1,
                    borderColor: COLORS.gray,
                    marginRight: 6,
                    paddingHorizontal: 12
                    // flex: 1,
                    // marginLeft: 10,
                    // fontSize: 16,
                    // lineHeight: 16,
                    // marginTop: 0,
                    // marginBottom: 3,
                    // borderRadius: 22,
                    // borderWidth: 1,
                    // borderColor: "#CCCCCC",
                    // marginRight: 6,
                    // paddingHorizontal: 12,
                    // height: 41,
                
                }}
            />
        </SafeAreaView>
    )
}

export default PersonalChat