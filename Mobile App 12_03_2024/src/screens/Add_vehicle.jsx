import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    StyleSheet, Text, TouchableOpacity, View, Image, StatusBar,
    Modal, ActivityIndicator, ToastAndroid
} from 'react-native';
import { TextInput } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PhoneInput from "react-native-phone-number-input";
import { Colors } from "react-native/Libraries/NewAppScreen";
import SelectDropdown from 'react-native-select-dropdown'

import { useSelector, useDispatch } from 'react-redux'
import { addVehicles } from "../actions/vehicles";
import { useFocusEffect } from '@react-navigation/native';

const types = ["Teltonika", "Concox"]
const teltonikaModels = ["FMC130", "FMC190", "FMB390"];
const concoxModels = ["ConcoxModel1", "ConcoxModel2", "ConcoxModel3"];

function Add_vehicle({ navigation }) {

    const dispatch = useDispatch()
    const userReducer = useSelector(state => state.auth);
    const vehicleReducer = useSelector(state => state.vehicles);

    const [vehicleName, setVehicleName] = useState("");
    const [vehicleImei, setVehicleImei] = useState("");
    const [deviceType, setDeviceType] = useState("Teltonika");
    const [deviceModel, setDeviceModel] = useState("FMC130");
    const [simNumber, setSimNumber] = useState("");

    const [deviceTypeIndex, setDeviceTypeIndex] = useState(0);

    // useFocusEffect(
    //     React.useCallback(() => {
    //         setVehicleName('');
    //         setVehicleImei('');
    //         setDeviceType(1);
    //         setDeviceModel('FMC130');
    //         setSimNumber('');
    //     }, [])
    // );

    useEffect(() => {
        setVehicleName('');
        setVehicleImei('');
        setDeviceType("Teltonika");
        setDeviceModel('FMC130');
        setSimNumber('');
    }, []);

    function validate() {
        if (vehicleName === "" || vehicleImei === "" || deviceType === "" || deviceModel === "" || simNumber === "") {
            ToastAndroid.show(
                'Please Enter Vehicle information',
                ToastAndroid.SHORT,
            );
        } else {
            dispatch(addVehicles(userReducer.token, userReducer.user._id, vehicleName, vehicleImei, deviceType, deviceModel, simNumber, navigation))

            // navigation.navigate('MainBoard');
        };
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFF', height: hp('80%'), paddingTop: 16 }}>
            <Modal visible={vehicleReducer.isAddingVehicle} transparent={true}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                    <ActivityIndicator size="large" color="rgba(54, 52, 53, 1)" />
                </View>
            </Modal>

            <View style={styles.v2}>
                <View>
                    <TextInput style={styles.in1} placeholder='Toyota Corolla X' value={vehicleName} onChangeText={(val) => { setVehicleName(val) }} />
                    <Text style={styles.inputHeader}>Vehicle Name</Text>
                </View>
                <View>
                    <TextInput style={styles.in1} placeholder='893475974398' maxLength={15} keyboardType='numeric' value={vehicleImei} onChangeText={(val) => { setVehicleImei(val) }} />
                    <Text style={styles.inputHeader}>Device IMEI</Text>
                </View>
                {/* <View>
                    <TextInput style={styles.in1} placeholder='Iphone' value={deviceType} onChangeText={(val) => { setDeviceType(val) }} />
                    <Text style={styles.inputHeader}>Device Type</Text>
                </View> */}
                <View>
                    <SelectDropdown
                        defaultValue={types[0]}
                        defaultDropdownIconColor="#007aff"
                        data={types}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            setDeviceTypeIndex(index);
                            setDeviceType(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                        dropdownStyle={{ backgroundColor: '#e6f5ff', borderRadius: 5 }}
                        itemTextStyle={{ textAlign: 'left' }}
                        buttonStyle={styles.dropdown}
                        buttonTextStyle={{ padding: 4, fontSize: 16, textAlign: 'left' }}
                    />
                    <Text style={styles.inputHeader}>Device Type</Text>
                </View>
                <View>
                    <SelectDropdown
                        defaultValue={deviceTypeIndex == 0 ? teltonikaModels[0] : concoxModels[0]}
                        defaultDropdownIconColor="#007aff"
                        data={deviceTypeIndex == 0 ? teltonikaModels : concoxModels}
                        onSelect={(selectedItem, index) => {
                            setDeviceModel(selectedItem)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                        dropdownStyle={{ backgroundColor: '#e6f5ff', borderRadius: 5 }}
                        itemTextStyle={{ textAlign: 'left' }}
                        buttonStyle={styles.dropdown}
                        buttonTextStyle={{ padding: 4, fontSize: 16, textAlign: 'left' }}
                    />
                    <Text style={styles.inputHeader}>Device Model</Text>
                </View>
                <View style={[styles.in2, { height: hp('7.5%') }]}>
                    <PhoneInput
                        style={{}}
                        containerStyle={{ backgroundColor: '#e6f5ff', padding: 0, margin: 0 }}
                        textInputStyle={{ backgroundColor: '#e6f5ff', padding: 0, margin: 0 }}
                        labelStyle={{ backgroundColor: '#e6f5ff', padding: 0, margin: 0 }}
                        // inputStyle={{ backgroundColor: '#e6f5ff' }}
                        codeTextStyle={{ backgroundColor: '#e6f5ff', }}
                        textInputProps={< TextInput style={{ backgroundColor: '#e6f5ff', padding: 0, margin: 0 }} />}
                        flagButtonStyle={{ backgroundColor: '#e6f5ff', marginLeft: 2 }}
                        textContainerStyle={{
                            backgroundColor: '#e6f5ff'
                        }}
                        placeholder="4575474523"
                        keyboardType="phone-pad"
                        defaultCode="FR"
                        onChangeText={(text) => {
                            setSimNumber(text);
                        }}
                        value={simNumber}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.to2} onPress={() => { validate() }}>
                <Text style={{ color: 'white', fontSize: 14, fontWeight: '500' }}>
                    Submit
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
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
        marginHorizontal: 8,
        marginTop: -12,
        borderRadius: 12,
        position: 'relative',
        height: hp('64%'),
        justifyContent: 'space-between',
        marginVertical: hp('3%'),
        paddingVertical: 16


    },
    dropdown: {
        marginLeft: wp('4%'),
        marginRight: wp('4%'),
        marginTop: hp('2.8%'),
        borderRadius: 5,
        borderWidth: 1,
        height: hp('6.5%'),
        paddingLeft: wp('5%'),
        borderColor: '#18567F8C',
        backgroundColor: "#e6f5ff",
        textAlign: 'left',
        width: '92%'
    },
    in1: {
        marginLeft: wp('4%'),
        marginRight: wp('4%'),
        marginTop: hp('2.8%'),
        borderRadius: 5,
        borderWidth: 1,
        height: hp('6.5%'),
        padding: 4,
        paddingLeft: wp('5%'),
        borderColor: '#18567F8C',
    },
    in2: {
        marginLeft: wp('4%'),
        marginRight: wp('4%'),
        marginTop: hp('3.5%'),
        marginBottom: hp('1.8%'),
        borderRadius: 3,
        borderWidth: 1,
        height: hp('6.5%'),
        // paddingLeft: wp('5%'),
        borderColor: '#18567F8C',
    },
    to2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('85%'),
        height: hp('7%'),
        alignSelf: 'center',
        backgroundColor: '#18567F',
        marginHorizontal: 20,
        marginTop: 10,
        borderRadius: 10
    },
    img: {
        width: 36, height: 24,
        position: 'absolute',
        top: 35,
        left: 25
    },
    detailHeader: {
        flexDirection: 'row',
        position: 'relative',
        marginVertical: hp('4%'),
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputHeader: {
        position: 'absolute',
        backgroundColor: '#e6f5ff',
        left: wp('10%'),
        top: 12,
        fontSize: 10,
        fontWeight: '500',
        color: '#18567F'
    },
    textInputStyle: {
        color: '#FFF',
        fontFamily: 'calibri',
        fontSize: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.3)',
        marginBottom: 20,
    },
});
export default Add_vehicle