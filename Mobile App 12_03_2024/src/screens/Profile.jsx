import React, { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, Image, View, StatusBar, StyleSheet, Slider, TextInput } from 'react-native'
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-native-modal';
import { current } from '@reduxjs/toolkit';
import { changePassword, changeEmail, changeUserName, changePhoneNumber } from '../actions/auth';

function Profile({ navigation }) {
    const dispatch = useDispatch();
    const [val, setVal] = useState(0.3)
    const userReducer = useSelector(state => state.auth);
    const [passwordModal, setPasswordModal] = useState(false);
    const [userNameModal, setUserNameModal] = useState(false);
    const [mailModal, setEmailModal] = useState(false);
    const [phoneModal, setPhoneModal] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [newPhone, setNewPhone] = useState("");

    const setPassword = () => {
        setPasswordModal(false);
        dispatch(changePassword(userReducer.user._id, currentPassword, newPassword));

    }
    const setEmail = () => {
        dispatch(changeEmail(userReducer.user._id, newEmail));
        console.log("userReducer-----------", userReducer);
        setEmailModal(false);

    }
    const setUserName = () => {
        setUserNameModal(false);
        dispatch(changeUserName(userReducer.user._id, newUserName));
    }

    const setPhoneNumber = () => {
        setPhoneModal(false);
        dispatch(changePhoneNumber(userReducer.user._id, newPhone));
    }

    return (
        <SafeAreaView style={styles.v1}>
            <Modal isVisible={passwordModal} >
                <View style={styles.modalContent}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text>Current Password: </Text>
                        <TextInput style={styles.passwordInput} secureTextEntry={true} onChangeText={(val) => setCurrentPassword(val)}></TextInput>
                    </View>
                    <View>
                        <Text>New Password: </Text>
                        <TextInput style={styles.passwordInput} secureTextEntry={true} onChangeText={(val) => setNewPassword(val)}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={styles.modalButton} onPress={setPassword}>
                            <Text style={{ color: 'white', fontSize: 16 }}>OK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setPasswordModal(false)}
                        >
                            <Text style={{ color: 'white', fontSize: 16 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={mailModal} >
                <View style={styles.modalContent}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text>Current Email: </Text>
                        <Text>{userReducer.user.email} </Text>
                    </View>
                    <View>
                        <Text>New Email: </Text>
                        <TextInput style={styles.passwordInput} onChangeText={(val) => setNewEmail(val)}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={styles.modalButton} onPress={setEmail}>
                            <Text style={{ color: 'white', fontSize: 16 }}>OK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setEmailModal(false)}
                        >
                            <Text style={{ color: 'white', fontSize: 16 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={userNameModal} >
                <View style={styles.modalContent}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text>Current UserName: </Text>
                        <Text>{userReducer.user.name} </Text>
                    </View>
                    <View>
                        <Text>New UserName: </Text>
                        <TextInput style={styles.passwordInput} onChangeText={(val) => setNewUserName(val)}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={styles.modalButton} onPress={setUserName}>
                            <Text style={{ color: 'white', fontSize: 16 }}>OK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setUserNameModal(false)}
                        >
                            <Text style={{ color: 'white', fontSize: 16 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal isVisible={phoneModal} >
                <View style={styles.modalContent}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text>Current PhoneNumber: </Text>
                        <Text>{userReducer.user.phone} </Text>
                    </View>
                    <View>
                        <Text>New PhoneNumber: </Text>
                        <TextInput style={styles.passwordInput} onChangeText={(val) => setNewPhone(val)}></TextInput>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={styles.modalButton} onPress={setPhoneNumber}>
                            <Text style={{ color: 'white', fontSize: 16 }}>OK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => setPhoneModal(false)}
                        >
                            <Text style={{ color: 'white', fontSize: 16 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <StatusBar backgroundColor={'#18567F'} barStyle={'light'} />
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={styles.listItem} onPress={() => setUserNameModal(true)}>
                    <Text style={styles.listTitle}>Username</Text>
                    <Text style={styles.listString}>{userReducer.user.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem} onPress={() => setEmailModal(true)}>
                    <Text style={styles.listTitle}>Email</Text>
                    <Text style={styles.listString}>{userReducer.user.email}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem} onPress={() => setPhoneModal(true)} >
                    <Text style={styles.listTitle}>Phone Number</Text>
                    <Text style={styles.listString}>{userReducer.user.phone}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.listItem} onPress={() => setPasswordModal(true)}>
                    <Text style={styles.listTitle}>Password</Text>
                    <View >
                        < IconComponentProvider IconComponent={MaterialCommunityIcons} style={{ flexDirection: 'row', alignItems: 'center', alignSelf: "center" }}>
                            <Icon name="chevron-right" size={20} style={{ alignSelf: 'center' }} />
                        </IconComponentProvider>
                    </View>
                </TouchableOpacity>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>Language</Text>
                    < IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="chevron-right" size={20} style={{}} />
                    </IconComponentProvider>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>Maps</Text>
                    < IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="chevron-right" size={20} style={{}} />
                    </IconComponentProvider>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>Help</Text>
                    < IconComponentProvider IconComponent={MaterialCommunityIcons} >
                        <Icon name="chevron-right" size={20} style={{}} />
                    </IconComponentProvider>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>About Us</Text>
                    {/* <View style={{flex:1, justifyContent: 'space-between', alignItems:'center'}}> */}
                    < IconComponentProvider IconComponent={MaterialCommunityIcons} style={{}}>
                        <Icon name="chevron-right" size={20} style={{}} />
                    </IconComponentProvider>
                    {/* </View> */}
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>Term and condition</Text>
                    < IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="chevron-right" size={20} style={{}} />
                    </IconComponentProvider>
                </View>
                <View style={styles.listItem}>
                    <Text style={styles.listTitle}>Deconnexion</Text>
                    < IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="chevron-right" size={20} style={{}} />
                    </IconComponentProvider>
                </View>
            </View>



        </SafeAreaView>
    )
}

export default Profile
const styles = StyleSheet.create({
    v1: {
        flex: 1,
        backgroundColor: 'white'
    },
    t1: {
        fontSize: 14,
        fontWeight: '400',
        color: '#FFFF',
        alignSelf: 'center',
        textAlign: 'center',
        paddingTop: hp('4%')
    },
    to1: {
        position: 'absolute',
        width: 30,
        height: 30,
        left: 30,
        top: hp('4%'),
        borderRadius: 40,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFF',
        borderColor: '#FFFF'
    },
    detailHeader: {
        flexDirection: 'row',
        position: 'relative',
        marginVertical: hp('4%'),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listHeader: {
        fontSize: 12,
        fontWeight: '400',
        color: '#18567F',
        alignSelf: 'center',
        textAlign: 'center',
        opacity: 0.8,
        marginTop: 4
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
        width: wp('85%'),
        alignSelf: 'center',
        // paddingVertical: 6,
        marginTop: hp('2%'),
    },
    listString: {
        fontSize: 12,
        fontWeight: '400',
        color: '#000000C4',
        alignSelf: 'center',
        textAlign: 'center',

    },
    listTitle: {
        fontSize: 15,
        fontWeight: '400',
        color: '#111111',
        alignSelf: 'center',
        textAlign: 'center',

    },
    passwordInput: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 4,
        paddingHorizontal: 12,
        width: '100%'
    },
    modalButton: {
        backgroundColor: "#18567F",
        width: '48%',
        borderRadius: 4,
        padding: 8,
        alignItems: 'center'
    },
    modalContent: {
        flex: 1,
        width: wp('60%'),
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 24,
        justifyContent: 'space-evenly',
        marginVertical: hp('25%')

    }
})