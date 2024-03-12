import React, { useState } from 'react'
import SafeAreaView from 'react-native-safe-area-view';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { TextInput, ToastAndroid } from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LoadingComponent from '../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { recharger } from '../actions/membership';

function Membership2({ navigation, route }) {
    const { infos, mobis } = route.params;

    const [username, setUserName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardCVV, setCardCVV] = useState(0);
    const [expiry, setExpiry] = useState('');

    const dispatch = useDispatch();
    const userReducer = useSelector(state => state.auth);
    const membershipReducer = useSelector(state => state.membership);

    const handleRecharge = () => {
        const expiryParts = expiry.split('/');
        const expiryMonth = expiryParts[0];
        const expiryYear = expiryParts[1];
        if (username === '' || cardNumber === '' || cardCVV === '') {
            ToastAndroid.show(
                'Please Enter Username, CardNumber and CVV',
                ToastAndroid.SHORT,
            );
        }
        else if (expiryMonth > 12 || expiryYear > 2500) {
            ToastAndroid.show(
                'Please Enter Expiry correctly.',
                ToastAndroid.SHORT,
            );
        }
        else {
            //calculate expirateDate
            const deviceExpirateDate = new Date(infos.expirateDate);
            const currentMonth = deviceExpirateDate.getMonth();
            deviceExpirateDate.setMonth(currentMonth + mobis);
            if (deviceExpirateDate.getMonth() < currentMonth) {
                deviceExpirateDate.setFullYear(deviceExpirateDate.getFullYear() + 1);
            }

            const amount = mobis * 15;
            dispatch(recharger(userReducer.token, userReducer.user.email, username,
                cardNumber, cardCVV, deviceExpirateDate, amount, infos.deviceImei, expiryMonth, expiryYear));
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <LoadingComponent isLoading={membershipReducer.isCharging} />
            <View style={[styles.viewBox]}>
                <View style={{ width: wp('85%'), backgroundColor: '#FFFF', alignSelf: 'center', borderRadius: 10, elevation: 5, borderWidth: 0.5, borderColor: 'rgba(24, 86, 127, 0.08)' }}>
                    <View style={{
                        backgroundColor: '#18567F', height: hp('6%'), alignItems: 'center',
                        justifyContent: 'center', borderRadius: 6, margin: 5
                    }}>
                        <Text style={{ color: '#FFFF', fontSize: 20, fontWeight: '500' }}>
                            {mobis} MOIS
                        </Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                        <Text style={{ fontSize: 14, fontWeight: '500', textAlign: 'center', marginTop: hp('4%') }}>Locate your device{'\n'}
                            anywhere with our recharge</Text>

                        <Text style={{ fontSize: 28, fontWeight: '500', marginVertical: hp('3%') }}>${mobis * 15}</Text>
                    </View>
                </View>
            </View>
            <Text style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', marginVertical: hp('1%'), fontSize: 16, fontWeight: '500' }}>
                IMEI: {infos.vehicle.deviceImei}
            </Text>
            <View style={{
                flex: 0.8,
                width: wp('85%'), backgroundColor: 'rgba(24, 86, 127, 0.15)',
                paddingHorizontal: 20, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginVertical: hp('0.5%'),
                paddingVertical: hp('1%')
            }}>
                <View style={styles.cardInfo}>
                    <Text style={styles.text1}>Name : </Text>
                    <View style={{ borderBottomWidth: 0.3, borderBottomColor: 'gray', flex: 0.7 }}>
                        <TextInput style={styles.text2} placeholder='william'
                            maxLength={20} value={username} onChangeText={(val) => { setUserName(val) }} />
                    </View>
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.text1}>Card : </Text>
                    <View style={{ borderBottomWidth: 0.3, borderBottomColor: 'gray', flex: 0.7 }}>
                        <MaskedTextInput
                            mask="9999 9999 9999 9999"
                            placeholder="0000 0000 0000 0000"
                            style={styles.text2}
                            value={cardNumber}
                            onChangeText={(text, rawText) => {
                                setCardNumber(rawText);
                            }}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.text1}>CVV : </Text>
                    <View style={{ borderBottomWidth: 0.3, borderBottomColor: 'gray', flex: 0.7 }}>
                        <MaskedTextInput
                            placeholder="352"
                            mask="999"
                            style={styles.text2}
                            value={cardCVV}
                            onChangeText={(text, rawText) => {
                                setCardCVV(rawText);
                            }}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
                <View style={styles.cardInfo}>
                    <Text style={styles.text1}>Expiry : </Text>
                    <View style={{ borderBottomWidth: 0.3, borderBottomColor: 'gray', flex: 0.7 }}>
                        <MaskedTextInput
                            mask="99/2999"
                            placeholder="09/2023"
                            value={expiry}
                            style={styles.text2}
                            onChangeText={(text, rawText) => {
                                setExpiry(text);
                            }}
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity style={[styles.to2, { flex: 0.2, marginBottom: 30 }]}
                onPress={handleRecharge}>
                <Text style={{ color: 'white', fontSize: 14, fontWeight: '400' }}>
                    Recharger
                </Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}

export default Membership2;
const styles = StyleSheet.create({
    v1: {
        flex: 1,
        backgroundColor: 'white'
    },
    t1: {
        fontSize: 14,
        fontWeight: '500',
        alignSelf: "center",
        textAlign: 'center',
        justifyContent: 'center'
    },
    detailHeader: {
        flexDirection: 'row',
        position: 'relative',
        marginVertical: hp('4%'),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    to1: {
        position: 'absolute',
        width: 30,
        height: 30,
        left: 5,
        borderRadius: wp('10%'),
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    v2: {
        backgroundColor: '#e6f5ff',
        margin: 8,
        borderRadius: 12,
    },
    text1: {
        fontSize: 15,
        fontWeight: '500',
        color: '#18567F',
        marginBottom: 5,
        textAlign: 'right',
        flex: 0.3
    },
    text2: {
        fontSize: 15,
        fontWeight: '500',
        width: wp('50%'),
        textAlign: 'right'
    },
    to2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('85%'),
        height: hp('7%'),
        backgroundColor: '#18567F',
        marginTop: hp('1%'),
        borderRadius: 10,
        marginBottom: 15,
        alignSelf: 'center'
    },
    viewBox: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        width: wp('100%'),
        padding: 7,
        alignItems: 'center',
        marginTop: hp('0.2%'),
    },
    slider: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFF',
    },
    dotContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: -50,
        alignItems: 'center'
    },
    cardInfo: {
        flexDirection: 'row',
        marginBottom: 12,
        justifyContent: 'space-between',
    }
});