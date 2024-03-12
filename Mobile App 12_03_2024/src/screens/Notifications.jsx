import React, { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, View, StatusBar, StyleSheet, Slider, TextInput, FlatList } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';

import { useSelector, useDispatch } from 'react-redux';
import { showNotifications } from '../actions/notifications';
import { useFocusEffect } from '@react-navigation/native';

function Notifications({ navigation }) {

    const dispatch = useDispatch();
    const userReducer = useSelector(state => state.auth);
    const notificationsReducer = useSelector(state => state.notifications);

    const [searchText, setSearchText] = React.useState("");
    const changeText = (newText) => {
        setSearchText(newText);
    };

    function filterData(data) {
        return data.filter(
            function (item) {
                if (item.alert.toLowerCase().includes(searchText.toLowerCase())) {
                    return item;
                }
                if (item.vehicle.toLowerCase().includes(searchText.toLowerCase())) {
                    return item;
                }
            }
        );
    }

    useFocusEffect(
        React.useCallback(() => {
            dispatch(showNotifications(userReducer.token, userReducer.user._id));
        }, [])
    );

    const NotificationList = () => {
        console.log(notificationsReducer);
        if (!notificationsReducer.isGettingNotifies && notificationsReducer.notifications.length === 0) {
            return (
                <View style={{ flex: 1, alignSelf: 'center' }}>
                    <Text style={{ alignItems: 'center', marginTop: hp('30%') }}>No Notifications</Text>
                </View>
            )
        }
        else {
            return (
                < FlatList
                    data={filterData(notificationsReducer.notifications)}
                    renderItem={({ item }) => renderNotificationItem(item)
                    }
                    style={{ width: wp('100%'), height: hp('100%'), backgroundColor: 'white' }}
                />
            )
        }
    }

    const renderNotificationItem = (item) => {
        const date = new Date(item.time);
        return (
            <View style={styles.listItem}>
                <Text style={styles.listString}>{item.alert}</Text>
                <Text style={styles.listString}>{item.vehicle}</Text>
                <Text style={styles.listString}>{date.toLocaleString()}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{ paddingTop: 20, backgroundColor: 'white' }}>
            <StatusBar backgroundColor={'#18567F'} barStyle={'light'} />

            <View style={{ flexDirection: 'row', width: wp('90%'), height: hp('6.5%'), borderRadius: 4, marginLeft: 10, marginTop: 5, backgroundColor: "#18567F12", alignItems: 'center' }}>
                <TextInput placeholder='Search Vehicle' style={{ width: '100%', paddingLeft: 10 }} onChangeText={(val) => changeText(val)} />
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', width: wp('95%'), marginBottom: 10 }}>
                <Text style={styles.listHeader}>Alert</Text>
                <Text style={styles.listHeader}>Vehicle</Text>
                <Text style={styles.listHeader}>Time</Text>
            </View>

            <NotificationList />
        </SafeAreaView>
    )
}

export default Notifications
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
        marginTop: hp('5%')
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
        fontWeight: '500',
        color: '#18567F',
        alignSelf: 'center',
        textAlign: 'center',
        opacity: 0.8,
        marginTop: 10,
        marginBottom: -10
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: "#18567F12",
        borderRadius: 4,
        width: wp('95%'),
        alignSelf: 'center',
        alignItems: 'center',
        marginVertical: 4,
        paddingVertical: 5
    },
    listString: {
        fontSize: 11,
        fontWeight: '400',
        color: '#1E6B97',
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: 4
    }
})