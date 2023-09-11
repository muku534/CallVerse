import { View, Text, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import PageContainer from '../../components/PageContainer';
import { AntDesign, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES, images } from '../../../constants';


const Chat = ({ navigation }) => {
    const contacts = [
        {
            id: '1',
            userName: 'Mr.Mukesh',
            userImg: images.user4,
            isOnline: false,
            lastSeen: '1 Min ago',
            lastMessage: 'How is it going...',
            messageInQueue: 3,
            sentData: '1277',
        },
        {
            id: '2',
            userName: 'Doraemon',
            userImg: images.user5,
            isOnline: false,
            lastSeen: '1 Min ago',
            lastMessage: 'How is it going...',
            messageInQueue: 3,
            sentData: '1277',
        },
        {
            id: '3',
            userName: 'Ankita',
            userImg: images.user1,
            isOnline: false,
            lastSeen: '1 Min ago',
            lastMessage: 'How is it going...',
            messageInQueue: 3,
            sentData: '1277',
        }
    ];

    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState(contacts);

    const handleSearch = (text) => {
        setSearch(text);
        const filteredData = contacts.filter((user) =>
            user.userName.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredUsers(filteredData);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('PersonalChat', {
                    userName: item.userName, userImg: item.userImg,
                })
            }
            style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 22,
                borderBottomColor: COLORS.secondaryWhite,
                borderBottomWidth: 1,
                paddingVertical: 15,
                marginRight: 22,
            }}
        >
            {item.isOnline && (
                <View
                    style={{
                        height: 14,
                        width: 14,
                        borderRadius: 7,
                        backgroundColor: COLORS.green,
                        borderColor: COLORS.white,
                        borderWidth: 2,
                        position: 'absolute',
                        top: 14,
                        right: 2,
                        zIndex: 1000,
                    }}
                />
            )}

            <Image
                source={item.userImg}
                resizeMode="contain"
                style={{
                    height: 45,
                    width: 45,
                    borderRadius: 25,
                }}
            />
            <View style={{ flexDirection: 'column', marginHorizontal: 15 }}>
                <Text style={{ ...FONTS.h4, marginBottom: 4 }}>{item.userName}</Text>
                <Text style={{ fontSize: 14, color: '#808080' }}>
                    {item.lastSeen}
                </Text>
            </View>
        </TouchableOpacity>
    );
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{ flex: 1 }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginHorizontal: 22,
                            marginTop: 15,
                        }}
                    >
                        <Text style={{ ...FONTS.h4 }}>Chats</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => console.log('Add Contacts')}>
                                <MaterialCommunityIcons
                                    name="message-badge-outline"
                                    size={20}
                                    color={COLORS.secondaryBlack}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ marginLeft: 12 }}
                                onPress={() => console.log('Add Contacts')}
                            >
                                <MaterialCommunityIcons
                                    name="playlist-check"
                                    size={20}
                                    color={COLORS.secondaryBlack}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            marginHorizontal: 22,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: COLORS.secondaryWhite,
                            height: 48,
                            marginVertical: 22,
                            paddingHorizontal: 12,
                            borderRadius: 20,
                        }}
                    >
                        <Ionicons name="ios-search-outline" size={24} color={COLORS.black} />

                        <TextInput
                            style={{
                                width: '100%',
                                height: '100%',
                                marginHorizontal: 12,
                            }}
                            placeholder="Search Contact..."
                            value={search}
                            onChangeText={handleSearch}
                        />
                    </View>
                    <View style={{ paddingBottom: 100 }}>
                        <FlatList
                            data={filteredUsers}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    );
};

export default Chat;
