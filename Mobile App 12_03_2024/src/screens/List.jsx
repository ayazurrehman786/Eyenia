import React, { useState } from 'react'
import {
  Text, TextInput, StyleSheet, View, TouchableOpacity, Image,
  FlatList, StatusBar, Alert
} from 'react-native'
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  MenuProvider,
} from 'react-native-popup-menu';
import LoadingComponent from '../components/Loading';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Menu, { MenuTrigger, MenuOptions, MenuOption } from 'react-native-popup-menu';
import { signals } from '../constants/signals';

import { useSelector, useDispatch } from 'react-redux';
import { vehicleList, deleteVehicle } from '../actions/vehicles';
import { useFocusEffect } from '@react-navigation/native';

export default function List({ navigation }) {

  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.auth);
  const vehiclesList = useSelector(state => {
    // console.log(state.vehicles)
    return state.vehicles.vehiclesList
  });
  console.log("vehiclesList:", vehiclesList)

  const vehicleReducer = useSelector(state => state.vehicles);

  const [searchText, setSearchText] = React.useState("");
  const changeText = (newText) => {
    setSearchText(newText);
  };

  function filterData(data) {
    return data;
    // return data.filter(
    //   function (item) {
    //     if (item.vehicle.vehicleName.toLowerCase().includes(searchText.toLowerCase())) {
    //       return item;
    //     }
    //     if (item.vehicle.deviceImei.toLowerCase().includes(searchText.toLowerCase())) {
    //       return item;
    //     }
    //   }
    // );
  }

  const handleDeleteVehicle = (imei) => {

    dispatch(deleteVehicle(userReducer.token, userReducer.user._id, imei, navigation));
  };
  useFocusEffect(
    React.useCallback(() => {
      dispatch(vehicleList(userReducer.token, userReducer.user._id));
    }, [])
  );

  const [selectedItem, setSelectedItem] = useState('');
  const VehicleItem = (item) => {
    let connectStatus = true;
    let diffInMin = 0;
    const teltonika = item.vehicle.teltonikas[0];
    if (item.vehicle.teltonikas.length > 0) {
      const date1 = new Date(teltonika.updatedAt);
      const date2 = new Date();
      diffInMin = (date2.getTime() - date1.getTime()) / 60000;
      if (diffInMin < 5) connectStatus = false;
    }
    return (
      <View style={styles.cardview} >
        <TouchableOpacity onPress={() => { navigation.navigate("MapScreen") }}>
          <View style={{ flexDirection: 'row', marginTop: 2, paddingHorizontal: 35, justifyContent: "space-between" }}>
            <View style={{ flexDirection: 'row', marginTop: 12, alignItems: 'center' }}>
              <Image source={require('../../assets/car1.png')} style={styles.icon} />
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#18567F', marginLeft: 10 }}>{item.vehicle.vehicleName}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 12, alignItems: 'center' }}>
              <Image source={require('../../assets/battery.png')} style={styles.icon} />
              <Text style={{ fontSize: 10, fontWeight: '400', marginLeft: 10 }}>{teltonika && teltonika.battery ? teltonika.battery : "0"}%</Text>
            </View>
          </View>

          <View style={{
            backgroundColor: 'rgba(24, 86, 127, 0.12)', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, marginTop: 10, paddingBottom: 10, flexDirection: 'column', paddingHorizontal: 35
          }}>
            <View style={{ flexDirection: 'row', marginTop: 16, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('18%'), alignItems: 'center' }}>
                <Image source={require('../../assets/meter.png')} style={styles.icon} />
                <Text style={{ fontSize: 10, fontWeight: '400' }}>{teltonika ? teltonika.speed : "0"}km/h</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('12%'), alignItems: 'center' }}>
                <Image source={require('../../assets/fuel.png')} style={styles.icon} />
                <Text style={{ fontSize: 10, fontWeight: '400', }}>{teltonika ? teltonika.fuel : "0"}L</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: wp('12%'), alignItems: 'center' }}>
                <Image source={require('../../assets/network.png')} style={styles.icon} />
                <Text style={{ fontSize: 10, fontWeight: '400', }}>{teltonika && teltonika.signal ? signals[teltonika.signal] : "None"}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 4 }}>
              <Text style={{ fontSize: 9, fontWeight: '400', marginTop: 10, color: connectStatus ? 'green' : 'red' }}>
                {connectStatus ? "Ew movement" : `Ew Arret ${diffInMin}min`}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ flex: 0.9, fontSize: 9, fontWeight: '400', lineHeight: 12 }}>
                {item.vehicle.teltonikas[0] && item.vehicle.teltonikas[0].address ? item.vehicle.teltonikas[0].address : 'no address information'}
              </Text>
              <View style={{ flex: 0.1, flexDirection: 'row', padding: 5, alignItems: 'center', }}>
                <Menu
                  position="relative"
                  relativeTop={-40}
                // anchor={setSelectedItem(item)}
                >
                  <MenuTrigger>
                    <View style={{ width: 60, height: 60, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="dots-vertical" size={20} color="#5D5C59" style={{ marginTop: 3 }} />
                      </IconComponentProvider>
                    </View>
                  </MenuTrigger>
                  <MenuOptions optionsContainerStyle={styles.menuOptions}
                    customStyles={{}}
                    name={item.vehicle.title}>
                    <MenuOption style={{ width: wp('30%'), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 7, alignItems: 'center' }}
                      onSelect={() => { navigation.navigate("Details", { "infos": item }) }}
                    >
                      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="format-list-text" size={20} color="#5D5C59" style={{}} />
                      </IconComponentProvider>
                      <Text style={styles.menuString}>Details</Text>
                    </MenuOption>
                    <MenuOption style={{ width: wp('30%'), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 7, alignItems: 'center' }}
                      onSelect={() => {
                        let title = item.vehicle.title;
                        Alert.alert(
                          'Warning',
                          'Are you going to delete this vehicle?',
                          [
                            {
                              text: 'Yes',
                              onPress: () => handleDeleteVehicle(item.vehicle.deviceImei),
                            },
                            {
                              text: 'No',
                              onPress: () => console.log("cancel"),
                            },
                          ],
                        );
                      }} >
                      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="delete" size={20} color="#5D5C59" style={{}} />
                      </IconComponentProvider>
                      <Text style={styles.menuString}>Delete</Text>
                    </MenuOption>
                    <MenuOption style={{ width: wp('30%'), flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 7, alignItems: 'center' }}
                      onSelect={() => { navigation.navigate('Regiage', { "infos": item }) }}
                    >
                      <IconComponentProvider IconComponent={MaterialCommunityIcons}>
                        <Icon name="cog-outline" size={20} color="#5D5C59" style={{}} />
                      </IconComponentProvider>
                      <Text style={styles.menuString}>Setting</Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const VehicleList = () => {
    //console.log("vehicles::::", vehicleReducer.vehicles);
    if (!vehiclesList || (!vehicleReducer.isVehicleList && vehiclesList.length === 0)) {
      return (
        <View style={{ flex: 1, alignSelf: 'center' }}>
          <Text style={{ alignItems: 'center', marginTop: hp('30%') }}>No Vehicles</Text>
        </View>
      )
    }
    else {
      return (
        <MenuProvider>
          <FlatList
            data={filterData(vehiclesList)}
            renderItem={({ item }) => VehicleItem(item)}
            style={{ width: wp('100%'), height: hp('100%'), backgroundColor: 'white' }}
          />
        </MenuProvider>
      )
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <LoadingComponent isLoading={vehicleReducer.isVehicleList} />
      <LoadingComponent isLoading={vehicleReducer.isRemovingVehicle} />
      <View style={{ borderWidth: 1, width: wp('90%'), alignSelf: 'center', borderRadius: 4, borderColor: "#ddd", backgroundColor: 'white' }}>
        <View style={{ flexDirection: 'row', marginVertical: 5, alignItems: 'center' }}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="magnify" size={wp('6%')} color="#5D5C59" style={{ marginLeft: 8 }} />
          </IconComponentProvider>
          <TextInput placeholder='Search Vehicle' style={{ width: wp('72%'), marginLeft: 5, zIndex: 9 }}
            value={searchText}
            onChangeText={changeText}
          />
        </View>
      </View>

      <VehicleList />

    </View>
  )
}

const styles = StyleSheet.create({
  to1: {
    width: 30,
    height: 30,
    borderRadius: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: wp('4%')
  },
  t1: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: wp('30%'),
    marginTop: 22
  },
  v1:
  {
    backgroundColor: '#18567F',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    right: wp('3%'),
    flexDirection: 'row'
  },
  icon: {
    width: 16,
    height: 16
  },
  cardview:
  {
    width: wp('90%'),
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#FFFF',
    marginTop: 10,
    marginBottom: 10,
    elevation: 10,
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
  newCar: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: hp('87%'),
    alignItems: 'center',
    backgroundColor: '#18567F',
    justifyContent: 'center',
    borderRadius: 15,
    alignSelf: 'center',
    elevation: 5,
    zIndex: 100
  },
  tabView: {
    width: '100%',
    height: hp('8%'),
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: 'center',
    paddingHorizontal: 19,
    position: 'absolute',
    top: hp('90%'),
    zIndex: 99
  },
  menuString: {
    fontSize: 11,
  },
  menuOptions: {
    alignItems: 'center',
    width: wp('30%'),
    marginTop: hp('-10%'),
    borderRadius: 5
  },
})