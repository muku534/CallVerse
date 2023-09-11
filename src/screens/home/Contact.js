import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    FlatList,
    Image,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, images } from '../../../constants';
import PageContainer from '../../components/PageContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios"
import { getUserData } from '../auth/Storage'

const Contact = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filteredContacts, setFilteredContacts] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await getUserData();
                if (user) {
                    setUserData(user);
                    console.log("This is the userData:", user.randomNumber);
                    // Fetch contacts only when user data is available
                    setContacts(user.randomNumber);
                } else {
                    // Handle the case where user data is not found
                    console.error("User data not found");
                }
            } catch (error) {
                // Handle any errors that occur during data fetching
                console.error("Error fetching user data:", error);
            }
        }

        fetchUserData();
    }, []);



    useEffect(() => {
        // Fetch contacts from your API here
        const fetchContacts = async () => {
            if (!userData) {
                setLoading(false);
                return; // Wait for userData to be available
            }
            try {
                const response = await axios.get(`http://192.168.42.81:5000/contacts`, {
                    params: {
                        userRandomNumber: userData.randomNumber
                    }
                });

                if (response.data.success) {
                    setContacts(response.data.contacts);
                    console.log(response.data.contacts)
                    setFilteredContacts(response.data.contacts);
                } else {
                    // Handle the case when the server returns an error
                    console.error('Error fetching contact:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching contacts:', error);
                setLoading(false);
            } finally {
                setLoading(false); // Set loading to false whether success or error
            }
        };

        fetchContacts();
    }, [userData]);

    // Function to handle search input change
    const handleSearch = (text) => {
        setSearch(text);
        // Filter the contacts based on the search input
        const filteredData = contacts.filter((contact) =>
            contact.userName.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredContacts(filteredData);
    };


    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('PersonalChat', { userName: item.contactName, userImg: images.user4, recipientId: item.ContactUserId, })}
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
            {/* Render online status indicator if needed */}
            {/* Use item.randomNumber to uniquely identify contacts if needed */}
            <Image
                source={images.user4} // Assuming you have a UserImg property in your contact data
                resizeMode="contain"
                style={{
                    height: 45,
                    width: 45,
                    borderRadius: 25,
                }}
            />
            <View style={{ flexDirection: 'column', marginHorizontal: 15 }}>
                <Text style={{ ...FONTS.h4, marginBottom: 4 }}>{item.contactName}</Text>
                {/* Use item.randomNumber or other properties for additional contact information */}
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
                            marginTop: 35,
                        }}
                    >
                        <Text style={{ ...FONTS.h4 }}>Contacts</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("AddContact")}>
                            <AntDesign name="plus" size={20} color={COLORS.secondaryBlack} />
                        </TouchableOpacity>
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

                    {loading ? (
                        <View style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 50 }}>
                            <Text style={{ ...FONTS.h4, color: COLORS.secondaryGray }}>
                                Please add the Contacts
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={filteredContacts}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.randomNumber.toString()} // Use a valid identifier
                        />
                    )}


                </View>
            </PageContainer>
        </SafeAreaView>
    );
};

export default Contact;
