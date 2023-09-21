import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import ImagePicker from 'react-native-image-picker';
import PageContainer from '../../components/PageContainer';
import PageTitle from '../../components/PageTitle';
import { COLORS, FONTS, SIZES, } from '../../../constants';
import { AntDesign } from '@expo/vector-icons';
import Button from '../../components/Button';

const Profile = ({ navigation }) => {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const handleMenuOption = (option) => {
        if (option === 'viewProfile') {
            console.log('View Profile');
        } else if (option === 'removeProfile') {
            console.log('Remove Profile');
        } else if (option === 'changeProfile') {
            const options = {
                mediaType: 'photo',
                maxWidth: 300,
                maxHeight: 300,
                quality: 1,
            };

            ImagePicker.launchImageLibrary(options, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    console.log('Selected image:', response.uri);
                    // Handle the selected image URI and perform necessary actions
                }
            });
        }
        toggleMenu();
    };


    return (
        <SafeAreaView >
            <PageContainer>
                <PageTitle title="Profile" onPress={() => navigation.navigate('More')} />

                <View style={styles.container}>
                    <TouchableOpacity onPress={toggleMenu}>
                        <View
                            style={styles.profileContainer}
                        >
                            <AntDesign name="user" size={64} color="#111" />
                            <View
                                style={styles.addIcon}
                            >
                                <AntDesign name="pluscircle" size={28} color={COLORS.gray} />
                            </View>
                        </View>
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
                                    <Text style={{ ...FONTS.body3 }}>View Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingVertical: 8 }} onPress={() => handleMenuOption('removeProfile')}>
                                    <Text style={{ ...FONTS.body3 }}>Remove Profile</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ paddingVertical: 8 }} onPress={() => handleMenuOption('changeProfile')}>
                                    <Text style={{ ...FONTS.body3 }}>Change Profile</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </Modal>

                    <View style={styles.formContainer}>

                        <Text style={styles.inputLable}>Name</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='example@ Mukesh534'
                                placeholderTextColor={COLORS.secondaryGray}
                                keyboardType='email-address'
                                style={styles.TextInput}
                            />
                        </View>

                        <Text style={styles.inputLable}>Bio</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder='Hi there! My name is Mukesh'
                                placeholderTextColor={COLORS.secondaryGray}
                                keyboardType='email-address'
                            />
                            style={styles.TextInput}
                        </View>

                        <Text style={{
                            fontSize: 16,
                            fontWeight: '400',
                            // marginTop: 22,
                        }}> <AntDesign name="user" size={24} color="#111" /> </Text>

                        <Button
                            title="Login"
                            filled
                            onPress={() => navigation.navigate('BottomTabNavigation')}
                            style={styles.Button}
                        />
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    profileContainer: {
        width: 130,
        height: 130,
        marginVertical: 22,
        borderRadius: 100,
        backgroundColor: COLORS.secondaryWhite,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    formContainer: {
        width: '100%',
        paddingHorizontal: 22,
        paddingVertical: 0
    },
    inputLable: {
        fontSize: 16,
        fontWeight: '400',
        marginTop: 22,
    },
    inputContainer: {
        width: "100%",
        height: 48,
        marginVertical: 12,
        // borderColor: COLORS.black,
        // borderWidth: 1,
        // borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    TextInput: {
        width: "100%",
        height: 54,
        fontSize: 14,
        backgroundColor: COLORS.secondaryWhite,
        paddingLeft: 22,
        borderRadius: SIZES.padding
        ,
        paddingLeft: SIZES.padding
        ,
        color: '#111'
    },
    Button: {
        marginTop: 15,
        // marginVertical: 55,
        marginBottom: 4,
    }
})

export default Profile