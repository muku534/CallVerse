import { View, Text, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import PageContainer from '../../components/PageContainer'
import { COLORS, FONTS, images } from '../../../constants'
import { AntDesign, Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { getUserData } from '../auth/Storage'

const More = ({ navigation }) => {
    const [showMenu, setShowMenu] = useState(false);
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

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleMenuOption = (option) => {
        if (option === 'viewProfile') {
            console.log('View Profile');
        } else if (option === 'removeProfile') {
            console.log('Remove Profile');
        }
        toggleMenu();
    };



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PageContainer>
                <View style={{ flex: 1 }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 22,
                        marginVertical: 22,
                        marginTop: 35,
                    }}>
                        <Text style={{ ...FONTS.h4 }}>Settings</Text>
                    </View>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginHorizontal: 22
                    }}>

                        <View style={{
                            height: 40,
                            width: 40,
                            borderRadius: 34,
                            backgroundColor: COLORS.secondaryWhite,
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                            <Image source={images.user4} style={{
                                width: 60,
                                height: 60,
                                borderRadius: 100,
                                marginVertical: 48
                            }} />
                        </View>
                        <View style={{
                            flexDirection: "column",
                            marginHorizontal: 22
                        }}>
                            <Text style={{ ...FONTS.h4, marginVertical: 6 }}>
                                {userData?.name}
                            </Text>
                            <Text style={{ ...FONTS.body3, color: COLORS.gray }}> {userData?.randomNumber} </Text>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={{ flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end", marginLeft: 55 }}>
                            <MaterialIcons name='keyboard-arrow-right' size={24}
                                color={COLORS.black} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 32 }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Profile")}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 22,
                                paddingVertical: 12
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <AntDesign name='user'
                                    size={24}
                                    color={COLORS.black} />
                                <Text style={{ ...FONTS.h4, marginLeft: 12 }}>
                                    Account
                                </Text>
                            </View>
                            <MaterialIcons
                                name='keyboard-arrow-right'
                                size={24}
                                color={COLORS.black} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            console.log("presser")
                        }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 22,
                                paddingVertical: 12
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Ionicons
                                    name='chatbubble-ellipses-outline'
                                    size={24}
                                    color={COLORS.black} />
                                <Text style={{ ...FONTS.h4, marginLeft: 12 }}>
                                    Chat
                                </Text>
                            </View>
                            <MaterialIcons
                                name='keyboard-arrow-right'
                                size={24}
                                color={COLORS.black} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={toggleMenu}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 22,
                                paddingVertical: 12
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Entypo name='light-down'
                                    size={24}
                                    color={COLORS.black} />
                                <Text style={{ ...FONTS.h4, marginLeft: 12 }}>
                                    Appearance
                                </Text>
                            </View>
                            <MaterialIcons
                                name='keyboard-arrow-right'
                                size={24}
                                color={COLORS.black} />
                        </TouchableOpacity>

                        <Modal visible={showMenu} transparent animationType="fade">
                            <TouchableOpacity
                                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                                onPress={toggleMenu}
                            >
                                <View style={{
                                    backgroundColor: COLORS.white, borderRadius: 8, padding: 16, width: 250,
                                    height: 150,
                                }}>
                                    <TouchableOpacity style={{ paddingVertical: 8 }} onPress={() => handleMenuOption('viewProfile')}>
                                        <Text style={{ ...FONTS.body3 }}>Light</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ paddingVertical: 8 }} onPress={() => handleMenuOption('removeProfile')}>
                                        <Text style={{ ...FONTS.body3 }}>Dark</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </Modal>

                        <TouchableOpacity onPress={() => {
                            console.log("presser")
                        }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 22,
                                paddingVertical: 12
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Ionicons name='notifications-outline'
                                    size={24}
                                    color={COLORS.black} />
                                <Text style={{ ...FONTS.h4, marginLeft: 12 }}>
                                    Notifications
                                </Text>
                            </View>
                            <MaterialIcons
                                name='keyboard-arrow-right'
                                size={24}
                                color={COLORS.black} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            console.log("presser")
                        }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 22,
                                paddingVertical: 12
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <MaterialCommunityIcons name='shield-lock-open-outline'
                                    size={24}
                                    color={COLORS.black} />
                                <Text style={{ ...FONTS.h4, marginLeft: 12 }}>
                                    Privacy
                                </Text>
                            </View>
                            <MaterialIcons
                                name='keyboard-arrow-right'
                                size={24}
                                color={COLORS.black} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            console.log("presser")
                        }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 22,
                                paddingVertical: 12
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <AntDesign name='folder1'
                                    size={24}
                                    color={COLORS.black} />
                                <Text style={{ ...FONTS.h4, marginLeft: 12 }}>
                                    Data usage
                                </Text>
                            </View>
                            <MaterialIcons
                                name='keyboard-arrow-right'
                                size={24}
                                color={COLORS.black} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            console.log("presser")
                        }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 22,
                                paddingVertical: 12
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <Ionicons name='help-circle-outline'
                                    size={24}
                                    color={COLORS.black} />
                                <Text style={{ ...FONTS.h4, marginLeft: 12 }}>
                                    Help
                                </Text>
                            </View>
                            <MaterialIcons
                                name='keyboard-arrow-right'
                                size={24}
                                color={COLORS.black} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => {
                            console.log("presser")
                        }}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginHorizontal: 22,
                                paddingVertical: 12
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center"
                            }}>
                                <MaterialCommunityIcons name='email-outline'
                                    size={24}
                                    color={COLORS.black} />
                                <Text style={{ ...FONTS.h4, marginLeft: 12 }}>
                                    Invite Your Friends
                                </Text>
                            </View>
                            <MaterialIcons
                                name='keyboard-arrow-right'
                                size={24}
                                color={COLORS.black} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('Welcome')}
                            style={{
                                flexDirection: "row",
                                justifyContent: "center",
                                marginHorizontal: 22,
                                paddingVertical: 12,
                                alignItems: "center"
                            }}
                        >
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                marginTop: 22
                            }}>
                                <MaterialCommunityIcons name='logout-variant'
                                    size={24}
                                    color={COLORS.black} />
                                <Text style={{ ...FONTS.h4, marginLeft: 12, color: 'red' }}>
                                    Logout
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView >
    )
}

export default More