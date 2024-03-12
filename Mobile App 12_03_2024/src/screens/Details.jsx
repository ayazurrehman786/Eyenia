import React, { useEffect, useState } from 'react'
import {
    SafeAreaView, Text, TouchableOpacity, Image, Alert,
    View, StyleSheet, ScrollView, StatusBar, Modal
} from 'react-native'
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
function Details({ navigation, route }) {
    const { infos } = route.params;
    const [expiryDate, setExpiryDate] = useState('');
    useEffect(() => {
        const expiry = new Date(infos.vehicle.expirateDate);
        setExpiryDate(expiry.toISOString().slice(0, 19).replace('T', ' '));
    }, [infos])

    const [showSimNumber, setShowSimNumber] = useState(false);

    return (
        <SafeAreaView style={{ backgroundColor: '#ffff' }}>
            <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showSimNumber}
                    onRequestClose={() => {
                        setShowSimNumber(false);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ padding: 5 }}>
                                    SIM Number :
                                </Text>
                                <Text style={{ padding: 5 }}>
                                    {infos ? infos.vehicle.simNumber : ''}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ padding: 5, }}>
                                    ICCID :
                                </Text>
                                <Text style={{ padding: 5 }}>
                                    {infos.vehicle.teltonikas && infos.vehicle.teltonikas.iccid ? infos.vehicle.teltonikas.iccid : 'NO ICCID'}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                setShowSimNumber(false)
                            }}
                                style={{ padding: 6, backgroundColor: "#18567F21", borderRadius: 3, borderWidth: 0, marginTop: 15, paddingHorizontal: 24 }}
                            >
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
            <ScrollView>
                <View style={styles.v2}>
                    <View style={styles.v3}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.v1}>
                                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                    <Icon name="access-point" size={15} color="#18567F" />
                                </IconComponentProvider>
                            </View>
                            <Text style={styles.listLabel}>Nom de i appareil</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.rightLabel}>{infos.vehicle.vehicleName}</Text>
                            < IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                <Icon name="chevron-right" size={20} style={{}} />
                            </IconComponentProvider>
                        </View>
                    </View>

                    <View style={styles.v3}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.v1}>
                                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                    <Icon name="tag-outline" size={15} color="#18567F" />
                                </IconComponentProvider>
                            </View>
                            <Text style={styles.listLabel}>
                                Tyoe de i equipement
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.rightLabel}>{infos.vehicle.deviceType}</Text>
                        </View>
                    </View>

                    <View style={styles.v3}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.v1}>
                                <Image source={require('../../assets/imei.png')} />
                            </View>
                            <Text style={styles.listLabel}>IMEI</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.rightLabel}>{infos.vehicle.deviceImei}</Text>
                        </View>
                    </View>

                    <View style={styles.v3}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.v1}>
                                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                    <Icon name="clock-outline" size={15} color="#18567F" />
                                </IconComponentProvider>
                            </View>
                            <Text style={styles.listLabel}>Expiration</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.rightLabel}>{expiryDate}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.v3} onPress={() => setShowSimNumber(true)}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.v1}>
                                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                    <Icon name="sim" size={15} color="#18567F" style={{ transform: [{ rotate: '90deg' }] }} />
                                </IconComponentProvider>
                            </View>
                            <Text style={styles.listLabel}>SIM</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            < IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                <Icon name="chevron-right" size={20} />
                            </IconComponentProvider>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.v3}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.v1}>
                                <Image source={require('../../assets/chatgpt.png')} />
                            </View>
                            <Text style={styles.listLabel}>Icon de peripherique</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            < IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                <Icon name="chevron-right" size={20} />
                            </IconComponentProvider>
                        </View>
                    </View>
                </View>

                <View style={[styles.v2, { paddingBottom: 5 }]}>
                    <View style={styles.v3}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.v1}>
                                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                    <Icon name="battery-20" size={15} color="#18567F" style={{ transform: [{ rotate: '90deg' }] }} />
                                </IconComponentProvider>
                            </View>
                            <Text style={styles.listLabel}>
                                Battery
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.rightLabel}>{infos.vehicle.teltonikas ? infos.vehicle.teltonikas.battery : 0}%</Text>
                        </View>
                    </View>

                    <View style={styles.v3}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.v1}>
                                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                    <Icon name="information-outline" size={15} color="#18567F" />
                                </IconComponentProvider>
                            </View>
                            <Text style={styles.listLabel}>
                                Status
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.rightLabel}>Hors ligne</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.v2}>
                    <View style={styles.v3}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.v1}>
                                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                    <Icon name="calendar" size={15} color="#18567F" />
                                </IconComponentProvider>
                            </View>
                            <Text style={styles.listLabel}>
                                Dernière mis à jour</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.rightLabel}>{infos.vehicle.teltonikas ? infos.vehicle.teltonikas.transferDate : "2023 05:20 03:12"}</Text>
                        </View>
                    </View>
                    <View style={styles.v3}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.v1}>
                                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                    <Icon name="speedometer" size={15} color="#18567F" />
                                </IconComponentProvider>
                            </View>
                            <Text style={styles.listLabel}>
                                Vitesse
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.rightLabel}
                            >{infos.vehicle.teltonikas ? infos.vehicle.teltonikas.speed : 0}Km/h</Text>
                        </View>
                    </View>

                    <View style={styles.v3}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.v1}>
                                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                    <Icon name="longitude" size={15} color="#18567F" />
                                </IconComponentProvider>
                            </View>
                            <Text style={styles.listLabel}>
                                Longitude
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.rightLabel}
                            >{infos.vehicle.teltonikas ? infos.vehicle.teltonikas.lng : 0}</Text>
                        </View>
                    </View>
                    <View style={styles.v3}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.v1}>
                                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                    <Icon name="latitude" size={15} color="#18567F" />
                                </IconComponentProvider>
                            </View>
                            <Text style={styles.listLabel}>
                                Latitude
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.rightLabel}
                            >{infos.vehicle.teltonikas ? infos.vehicle.teltonikas.lat : 0}</Text>
                        </View>
                    </View>
                    <View style={styles.v3}>
                        <View style={{ flex: 0.3, flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.v1}>
                                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                    <Icon name="map-marker" size={15} color="#18567F" />
                                </IconComponentProvider>
                            </View>
                            <Text style={styles.listLabel}>
                                Address
                            </Text>
                        </View>
                        <View style={{ flex: 0.7, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.rightLabel}
                            >{infos.vehicle.teltonikas ? infos.vehicle.teltonikas.address : ''}</Text>
                        </View>
                    </View>
                    <View style={[styles.v3, { paddingBottom: 20, }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.v1}>
                                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                    <Icon name="account-outline" size={15} color="#18567F" />
                                </IconComponentProvider>
                            </View>
                            <Text style={styles.listLabel}>
                                Driver information
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity>
                                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                    <Icon name="chevron-right" size={20} />
                                </IconComponentProvider>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ width: '100%', backgroundColor: '#FFFF', position: 'absolute', height: '5%', top: hp('98%') }}>
                <TouchableOpacity style={{
                    width: 124, height: 5, borderRadius: 5, alignSelf: 'center',
                    backgroundColor: 'rgba(54, 52, 53, 1)', marginTop: 15
                }}>
                </TouchableOpacity>
            </View>
        </SafeAreaView >
    )
}

export default Details
const styles = StyleSheet.create({
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
    v1:
    {
        backgroundColor: '#18567F21',
        width: 25,
        height: 25,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardview:
    {
        width: 330,
        height: 175,
        borderRadius: 10,
        backgroundColor: '#FFFF',
        marginHorizontal: 15,
        marginTop: 15
    },
    text1: {
        fontSize: 11,
        fontWeight: '400',
        marginLeft: 10,
        marginTop: 4

    },
    to2: {
        marginTop: 13,
        flexDirection: 'row'
    },
    bottomtab: {
        width: wp('100%'),
        backgroundColor: 'white',
        height: 60,
        position: 'absolute',
        top: hp('94%')
    },
    newCar: {
        width: 60,
        height: 60,
        alignItems: 'center',
        backgroundColor: '#18567F',
        justifyContent: 'center',
        marginTop: -30,
        borderRadius: 20,
        marginLeft: 155
    },
    v2: {
        width: wp('95%'),
        alignSelf: 'center',
        backgroundColor: '#18567F12',
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        marginBottom: 15
    },
    v3: {
        flexDirection: 'row',
        width: wp('90%'),
        justifyContent: 'space-between',
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    listLabel: {
        fontSize: 11,
        fontWeight: '500',
        marginLeft: 10
    },
    rightLabel: {
        fontSize: 10,
        fontWeight: '500',
        color: '#18567F',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        textAlign: "center",
        alignItems: "center"
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    }
})