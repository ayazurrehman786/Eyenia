import React, { useState } from 'react'
import { SafeAreaView, Text, TouchableOpacity, Image, View, StatusBar, StyleSheet, Slider, TextInput } from 'react-native'
import MapView, { Marker, Polygon } from 'react-native-maps';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { updateGeofensePos } from "../actions/vehicles";
import axios from 'axios';
import { toastr } from '../services/navRef';
import { useEffect } from 'react';

const GOOGLE_API_KEY = "AIzaSyB_X2kKYs1hiQB2N4lCrhqQzLx9Te_0GG8"

function EditGeoData({ navigation, route }) {
    const [show3, setShow3] = useState(false)
    const [show4, setShow4] = useState(false)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [val, setVal] = useState(0.3)
    const [polygonData, setPolygonData] = useState([])  // point List of touch event
    const [roadPointList, setRoadPoinList] = useState([]) // Point List of real Road


    const dispatch = useDispatch()

    const userReducer = useSelector(state => state.auth);
    const token = userReducer.token;

    const vehicleReducer = useSelector(state => state.realtimeVehicles);

    const selectedVehicleID = vehicleReducer.seletedvehicleID;
    const dbPolygonData = vehicleReducer.vehicles[selectedVehicleID].vehicle.polygonData;
    const deviceImei = vehicleReducer.vehicles[selectedVehicleID].vehicle.teltonikas.deviceImei;
    const index = route.params.index;

    useEffect(() => {
        setRoadPoinList(dbPolygonData[index].polygonData)
        setShow3(dbPolygonData[index].enter)
        setShow4(dbPolygonData[index].sortie)
        setTitle(dbPolygonData[index].title)
        setContent(dbPolygonData[index].content)
    }, [])

    const onValueChange = (newValue) => {
        setVal(newValue);
    };

    const handlePressMap = async (coordinate) => {
        console.log("coordinate::::::", coordinate);

        if (polygonData.length != 0) {
            const recentPos = polygonData[polygonData.length - 1];

            console.log(recentPos.latitude + ',' + recentPos.longitude);
            console.log(coordinate.latitude + ',' + coordinate.longitude)
            const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${recentPos.latitude},${recentPos.longitude}&destination=${coordinate.latitude},${coordinate.longitude}&sensor=false&units=metric&key=${GOOGLE_API_KEY}`

            console.log(url)

            await axios.get(url)
                .then((response) => {
                    try {
                        if (response.data && response.data.routes) {
                            console.log(response.data.routes)
                            var steps = response.data.routes[0].legs[0].steps;
                            console.log(steps)
                            for (let index = 0; index < steps.length; index++) {
                                //console.log("Start_Address:::::", response.data.routes[index].legs[0].start_location)
                                console.log("start_location:::::", steps[index].start_location)
                                const start_location = steps[index].start_location;
                                const PtItem = { latitude: start_location.lat, longitude: start_location.lng }
                                setRoadPoinList((roadPointList) => [...roadPointList, PtItem])

                            }
                            // setRoadPoinList((roadPointList) => [...roadPointList, coordinate])

                        }
                    } catch (e) { reject(e) }
                }).catch((err) => {
                    console.log("error occured:::", err)
                });
        }
        setPolygonData((polygonData) => [...polygonData, coordinate])
    }

    const handleUpdateGeo = () => {
        console.log("Handle Update Geofense", deviceImei)
        if (roadPointList.length < 3) toastr("Please set at least 3 points")
        else {
            dispatch(updateGeofensePos(token, deviceImei, roadPointList, show3, show4, index, title, content));
            navigation.goBack()
        }
    }

    const handleTitleChange = (title) => {
        setTitle(title)
    }

    const handleContentChange = (content) => {
        setContent(content)
    }

    const clearPointList = () => {
        setPolygonData([])
        setRoadPoinList([])
    }

    return (
        <SafeAreaView style={{ marginTop: 20 }}>
            <MapView
                initialRegion={{
                    latitude: 30.733315,
                    longitude: 76.779419,
                    latitudeDelta: 2,
                    longitudeDelta: 1
                }}
                onPress={(e) => {
                    handlePressMap(e.nativeEvent.coordinate)
                }}
                style={{ width: wp('97%'), height: hp('81%'), borderRadius: 10, alignSelf: 'center' }}>
                {roadPointList.length !== 0 && <Polygon
                    coordinates={roadPointList}
                    strokeColor="#18567F"
                    strokeWidth={4}
                    fillColor="#bbb"
                />}
            </MapView>
            <View style={[styles.view1, { top: 210, left: 60 }]}>
                <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                    <Icon name="map-marker" size={15} color="#FFFF" />
                </IconComponentProvider>
            </View>

            <View style={styles.view4}>
                <TouchableOpacity
                    style={[styles.view5, {}]}
                    onPress={() => {
                        {
                            if (val <= 0) { setVal(0) } else { setVal(val - 0.1) }
                        }
                    }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>-</Text>
                </TouchableOpacity>
                <Text style={{}}>100m</Text>
                <Slider
                    styleAttr="Horizontal"
                    minimumValue={0}
                    maximumValue={1}
                    step={0.1}
                    value={val}
                    onValueChange={onValueChange}
                    thumbTintColor="#18567F"
                    minimumTrackTintColor="#18567F"
                    style={{ color: '#18567F', width: 144, }} />
                <Text style={{}}>5000m</Text>
                <TouchableOpacity
                    style={[styles.view5,]}
                    onPress={() => {
                        if (val >= 1) { setVal(1) } else { setVal(val + 0.1) }
                    }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>+</Text>
                </TouchableOpacity>
            </View>



            <TouchableOpacity
                style={styles.syncButton}
                onPress={() => clearPointList()}
            >
                <Image source={require('../../assets/sync.png')} />
            </TouchableOpacity>
            <View style={styles.view2}>
                <View style={styles.view3}>
                    <TextInput
                        placeholder="Title"
                        onChangeText={handleTitleChange}
                        value={title}
                        style={{ fontSize: 13, textAlign: 'center', fontWeight: '500', width: '30%', height: 35, borderWidth: 1, borderColor: "#555", borderRadius: 6 }}
                    />
                    <TextInput
                        placeholder="Content"
                        onChangeText={handleContentChange}
                        value={content}
                        style={{ fontSize: 13, textAlign: 'center', fontWeight: '500', width: '60%', height: 35, borderWidth: 1, borderColor: "#555", borderRadius: 6 }}
                    />
                </View>
                <View style={[styles.view3, { marginTop: hp('3%') }]}>
                    <Text style={{ fontSize: 11, fontWeight: '600', color: '#18567F' }}>Param...l’alerte</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.checkBox}
                            onPress={() => { setShow3(!show3) }}>
                            {show3 ? (<IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                <Icon name="check" size={20} color="#5D5C59" />
                            </IconComponentProvider>) : null}
                        </TouchableOpacity>
                        <Text style={{ fontSize: 10, fontWeight: '500', marginLeft: 10 }}>Enter</Text>
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.checkBox}
                            onPress={() => { setShow4(!show4) }}>
                            {show4 ? (<IconComponentProvider IconComponent={MaterialCommunityIcons}>
                                <Icon name="check" size={20} color="#5D5C59" />
                            </IconComponentProvider>) : null}
                        </TouchableOpacity>
                        <Text style={{ fontSize: 10, fontWeight: '500', marginLeft: 10 }}>Sortie</Text>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={handleUpdateGeo}
                    style={styles.bigButton}>
                    <Text style={{ color: '#FFFF', fontSize: 14, fontWeight: '500' }}>Update</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default EditGeoData

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
    view1: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: '#18567F',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    view2: {
        width: wp('93%'),
        position: 'absolute',
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 10,
        top: hp('67%')
    },
    view3: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: hp('2.5%'),
    },
    view4: {
        position: 'absolute',
        width: wp('85%'),
        height: hp('7%'),
        backgroundColor: '#FFFF',
        borderRadius: 10,
        top: hp('14%'),
        flexDirection: 'row',
        alignSelf: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    view5: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 25,
        height: 25,
        borderWidth: 0.7,
        borderRadius: 20
    },
    syncButton: {
        position: 'absolute',
        top: hp('60%'),
        left: wp('6%'),
        width: 35,
        height: 35,
        backgroundColor: '#FFFF',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5
    },
    checkBox: {
        width: wp('5%'),
        height: wp('5%'),
        borderWidth: 0.3,
        alignItems: 'center',
        borderRadius: 2
    },
    bigButton: {
        width: 300,
        height: 50,
        backgroundColor: '#18567F',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: hp('2.5%'),
        marginHorizontal: 20,
        marginVertical: hp('2.5%'),

    }
})