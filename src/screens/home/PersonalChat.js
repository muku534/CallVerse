import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    ImageBackground,
} from 'react-native';
import { COLORS, FONTS } from '../../../constants';
import { StatusBar } from 'expo-status-bar';
import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../auth/Storage';

const PersonalChat = ({ route, navigation }) => {
    const [userData, setUserData] = useState(null);
    const { userName, userImg, recipientId } = route.params;
    const [messages, setMessages] = useState([]);
    const [chatRoom, setChatRoom] = useState(null);
    const socket = io('http://192.168.42.81:5000');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (userData && chatRoom) {
                    // Retrieve messages from AsyncStorage
                    const storedMessages = await AsyncStorage.getItem(`chatMessages_${chatRoom}`);
                    const existingMessages = storedMessages ? JSON.parse(storedMessages) : [];

                    // Reverse the order of existing messages to display older messages first
                    const reversedMessages = existingMessages.reverse();


                    // Update the state with existing messages
                    setMessages(reversedMessages);

                    // Emit a 'getMessages' event to request existing messages from the server
                    socket.emit('getMessages', { room: chatRoom });

                    socket.on('messages', async (newMessages) => {
                        // Reverse the order of new messages to display older messages first
                        const reversedNewMessages = newMessages.reverse();
                        
                        // Update the state with new messages
                        setMessages((prevMessages) => GiftedChat.append(prevMessages, reversedNewMessages));

                        // Store the updated messages in AsyncStorage
                        await storeChatMessages(chatRoom, GiftedChat.append(existingMessages, reversedNewMessages));
                    });
                }
            } catch (error) {
                console.error('Error fetching and storing messages:', error);
            }
        };

        fetchData();
    }, [userData, chatRoom]);


    useEffect(() => {
        const fetchUserData = async () => {
            const user = await getUserData();
            if (user) {
                setUserData(user);
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        // Generate or retrieve the chat room name
        if (userData) {
            const room = generateChatRoomName(userData._id, recipientId);
            setChatRoom(room);
            socket.emit('joinRoom', { room });
        }
    }, [userData, recipientId, socket]);

    // useEffect(() => {
    //     fetchAndStoreMessages();
    // }, [userData, chatRoom]);

    useEffect(() => {
        if (userData) {
            socket.on('message', (newMessage) => {
                if (newMessage.room === chatRoom) {
                    setMessages((prevMessages) =>
                        GiftedChat.append(prevMessages, newMessage)
                    );

                    // Store the updated messages in local storage
                    storeChatMessages(chatRoom, messages.concat(newMessage));
                }
            });
        }
    }, [chatRoom, userData, messages, socket]);

    const onSend = useCallback(async (newMessages = []) => {
        if (userData) {
            const room = chatRoom;
            socket.emit('send', {
                sender: userData._id,
                recipient: recipientId,
                message: newMessages[0].text,
                room,
            });
        }

        const currentUser = {
            _id: userData ? userData._id : 1,
        };

        const newMessage = {
            ...newMessages[0],
            user: currentUser,
        };

        // Update the state with the new message
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessage)
        );

        // Store the updated messages in AsyncStorage
        await storeChatMessages(chatRoom, messages.concat(newMessage));
    }, [userData, recipientId, chatRoom, messages, socket]);

    const clearChatRoomAndMessages = async () => {
        try {
            // Remove chat messages
            await AsyncStorage.removeItem(`chatMessages_${chatRoom}`);

            // Optionally, you can remove the chat room entry as well
            // await AsyncStorage.removeItem(`chatRoom_${chatRoom}`);

            // Clear the messages in the state
            setMessages([]);

            console.log(`Chat room and messages for room ${chatRoom} deleted.`);
        } catch (error) {
            console.error(`Error deleting chat room and messages for room ${chatRoom}:`, error);
        }
    };


    const renderSend = (props) => (
        <TouchableOpacity onPress={() => onSend(props)}>
            <Send {...props}>
                <View style={{ borderRadius: 30 }}>
                    <View
                        style={{
                            height: 36,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 43,
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: COLORS.gray,
                            backgroundColor: COLORS.primary,
                            marginRight: 5,
                            marginBottom: 5,
                        }}
                    >
                        <FontAwesome name="send" size={15} color={COLORS.white} />
                    </View>
                </View>
            </Send>
        </TouchableOpacity>
    );

    const renderBubble = (props) => (
        <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: COLORS.secondary,
                },
            }}
            textStyle={{
                color: COLORS.white,
            }}
        />
    );

    const storeChatMessages = async (room, messagesToStore) => {
        try {
            await AsyncStorage.setItem(`chatMessages_${room}`, JSON.stringify(messagesToStore));
        } catch (error) {
            console.error('Error updating AsyncStorage:', error);
        }
    };

    const generateChatRoomName = (userId1, userId2) => {
        const sortedUserIds = [userId1, userId2].sort();
        return `${sortedUserIds[0]}-${sortedUserIds[1]}`;
    };

    return (
        <ImageBackground
            source={require('../../../assets/images/ChatBg.jpg')}
            style={{ flex: 1, resizeMode: 'cover' }}
        >
            <SafeAreaView style={{ flex: 1, color: COLORS.secondaryWhite }}>
                <StatusBar style="light" backgroundColor={COLORS.secondaryBlack} />
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 22,
                        backgroundColor: COLORS.secondaryBlack,
                        marginVertical: 22,
                        height: 60,
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Contacts')}
                            style={{ marginLeft: -10 }}
                        >
                            <MaterialIcons
                                name="keyboard-arrow-left"
                                size={28}
                                style={{ color: COLORS.secondaryWhite }}
                            />
                        </TouchableOpacity>
                        <Image
                            source={userImg}
                            resizeMode="contain"
                            style={{
                                height: 35,
                                width: 35,
                                borderRadius: 25,
                                marginLeft: 5,
                            }}
                        />
                        <Text style={{ ...FONTS.h4, marginLeft: 8, color: COLORS.secondaryWhite }}>{userName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => console.log('search')} style={{ margin: 8 }}>
                            <Ionicons
                                name="call-outline"
                                size={24}
                                color={COLORS.black}
                                style={{ color: COLORS.secondaryWhite }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log('menu')} style={{ margin: 8 }}>
                            <Feather
                                name="video"
                                size={24}
                                color={COLORS.black}
                                style={{ color: COLORS.secondaryWhite }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={clearChatRoomAndMessages}>
                            <MaterialIcons name="delete" size={24} style={{ color: COLORS.secondaryWhite }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <GiftedChat
                    messages={messages}
                    onSend={(newMessages) => onSend(newMessages)}
                    user={{
                        _id: userData ? userData._id : 1,
                    }}
                    renderBubble={renderBubble}
                    alwaysShowSend
                    renderSend={renderSend}
                    scrollToBottom
                    textInputStyle={{
                        borderRadius: 22,
                        borderWidth: 1,
                        borderColor: COLORS.gray,
                        marginRight: 6,
                        paddingHorizontal: 12,
                        backgroundColor: COLORS.black,
                        color: COLORS.secondaryWhite,
                    }}
                    style={{ backgroundColor: COLORS.secondaryBlack }}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};

export default PersonalChat;
