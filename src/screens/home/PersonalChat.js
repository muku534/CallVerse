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
import * as ImagePicker from 'expo-image-picker';

const PersonalChat = ({ route, navigation }) => {
    const [userData, setUserData] = useState(null);
    const { userName, userImg, recipientId } = route.params;
    const [messages, setMessages] = useState([]);
    const [chatRoom, setChatRoom] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedGif, setSelectedGif] = useState(null);
    const socket = io('http://192.168.42.54:5000');

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
                    socket.emit('getMessages', { sender: userData._id, recipient: recipientId });
                }
            } catch (error) {
                console.error('Error fetching and storing messages:', error);
            }
        };

        fetchData();
    }, [userData, chatRoom, recipientId]);

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
            socket.emit('joinRoom', { sender: userData._id, recipient: recipientId });
        }
    }, [userData, recipientId]);

    useEffect(() => {
        if (userData) {
            socket.on('message', (newMessage) => {
                if (newMessage.room === chatRoom) {
                    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessage));

                    // Store the updated messages in local storage
                    storeChatMessages(chatRoom, messages.concat(newMessage));
                }
            });
        }
    }, [chatRoom, userData, messages, socket]);

    // Function to handle image selection
    const pickImage = async () => {
        try {
            const options = {
                title: 'Select Image',
                mediaType: 'photo', // Allow selecting images only
                maxWidth: 800,
                maxHeight: 600,
                quality: 1,
            };

            const result = await ImagePicker.launchImageLibraryAsync(options);

            if (result.canceled) {
                console.log('User cancelled image picker');
            } else if (result.error) {
                console.error('ImagePicker Error: ', result.error);
            } else if (result.assets && result.assets.length > 0) {
                const selectedAsset = result.assets[0];
                const { uri, } = selectedAsset;

                // Convert the selected image to base64
                const base64Image = await fetch(uri)
                    .then((response) => response.blob())
                    .then((blob) => new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    }));

                setSelectedImage(base64Image); // Set the selected image URI
                console.log("Received File URI:", base64Image)
                // Send the selected image to the server
                socket.emit('send', {
                    sender: userData._id,
                    recipient: recipientId,
                    image: base64Image,
                });
            }
        } catch (error) {
            console.error('Error selecting image:', error);
        }
    };


    const onSend = useCallback(async (newMessages = []) => {
        if (userData) {
            const room = chatRoom;


            // Check if the message contains an image URL (for image messages)
            const isImageMessage = newMessages[0].image !== undefined;

            socket.emit('send', {
                sender: userData._id,
                recipient: recipientId,
                message: isImageMessage ? '' : newMessages[0].text, // Empty message for images
                room,
                image: isImageMessage ? newMessages[0].image : null, // Image URL for image messages

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
        setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessage));

        // Store the updated messages in AsyncStorage
        await storeChatMessages(chatRoom, [...messages, newMessage]);
    }, [userData, recipientId, chatRoom, messages, socket, selectedImage]);

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

    const renderMessageImage = (props) => {
        const { currentMessage } = props;

        if (currentMessage && currentMessage.image) {
            // Check if the message contains an image URL
            const image = currentMessage.image;

            // Render the image if it exists
            if (image.url) {
                return (
                    <Image
                        source={{ uri: image.url }}
                        style={{ width: 200, height: 200 }}
                        resizeMode="cover"
                    />
                );
            }
        }

        return null; // Return null if there is no image
    };



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
            style={{ flex: 1 }} resizeMode='cover'
        >
            <SafeAreaView style={{ flex: 1, color: COLORS.secondaryWhite }}>
                <StatusBar style="light" backgroundColor={COLORS.secondaryBlack} />
                <View style={{ flex: 1 }}>
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
                            <TouchableOpacity onPress={() => navigation.navigate('VoiceCall')} style={{ margin: 8 }}>
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
                        renderMessageImage={renderMessageImage} // Update this line
                        style={{ backgroundColor: COLORS.secondaryBlack }}
                    />
                    <TouchableOpacity onPress={pickImage}>
                        <FontAwesome name="paperclip" size={40} style={{ color: COLORS.secondaryWhite }} />
                    </TouchableOpacity>
                    {selectedImage && (
                        <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />
                    )}
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default PersonalChat;
