import React, { useState, useRef, useMemo } from 'react'
import { SafeAreaView, StatusBar, View, TouchableOpacity, Image, Text, StyleSheet, ProgressBarAndroid } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DateRangePicker from "rn-select-date-range";
import { vehicleHistory } from "../actions/vehicles";
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { toastr } from "../services/navRef";

function getStyleTime(today) {
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  return time;
}

function Historiquie2({ navigation, route }) {
  const { infos } = route.params;
  const vehicle = infos.vehicle;
  const userReducer = useSelector(state => state.auth);
  const vehicleReducer = useSelector(state => state.vehicles)
  const HistoryData = vehicleReducer.vehicleHistory;

  const token = userReducer.token;
  const dispatch = useDispatch();

  const [selectedRange, setRange] = useState({});
  const [showDataRangePicker, setshowDataRangePicker] = useState(false);
  const [markerLat, setMarkerLat] = useState(vehicle.teltonikas.lat);
  const [markerLng, setMarkerLng] = useState(vehicle.teltonikas.lng);
  const [progressBarValue, setProgressBarValue] = useState(0);
  const [onVehiclePlay, setVehiclePlay] = useState(false);
  const [polylineData, setPolyLineData] = useState([]);
  const [currentTime, setCurrentTime] = useState(getStyleTime(new Date()));

  const markerRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(15);

  const [region, setRegion] = useState({
    latitude: markerLat,
    longitude: markerLng,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  // var timeInterval = undefined;
  const [timeInterval, setTimeInterval] = useState(null);
  const handleMapRegionChange = (region) => {
    const LONGITUDE_DELTA_THRESHOLD = 0.01;
    const currentZoomLevel = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
    setZoomLevel(currentZoomLevel);
  };

  const confirmDataRangeSelect = () => {
    if (!selectedRange.firstDate || !selectedRange.secondDate)
      return;

    dispatch(vehicleHistory(token, vehicle.teltonikas.deviceImei, selectedRange.firstDate, selectedRange.secondDate));
    setshowDataRangePicker(false);
  }

  const handleStartPlay = () => {
    console.log("onVehiclePlay::::", onVehiclePlay)


    if (onVehiclePlay) {

      setVehiclePlay(false)
      setProgressBarValue(0)
      console.log("timeInterval before CLEAR::::", timeInterval)
      clearInterval(timeInterval)
    }

    else {

      if (!HistoryData || HistoryData.length == 0) {
        toastr('HISTORY DATA IS EMPTY');
        return
      }

      setVehiclePlay(true)
      let datalength = HistoryData.length;
      let posIndex = 0;

      setPolyLineData([])

      const moveVehicle = () => {
        if (posIndex == datalength - 1) {
          console.log("Play finished and timeInterval is :::::", timeInterval)
          clearInterval(timeInterval)
          setVehiclePlay(false)
          return
        }
        setMarkerLat(HistoryData[posIndex].lat)
        setMarkerLng(HistoryData[posIndex].lng)
        setCurrentTime(HistoryData[posIndex].transferDate);

        let tempArray = [];
        for (let index = 0; index <= posIndex; index++) {
          tempArray.push({ latitude: HistoryData[index].lat, longitude: HistoryData[index].lng })
        }
        setPolyLineData(tempArray)

        if (Math.abs(region.latitude - HistoryData[posIndex].lat) > 0.0001 || Math.abs(region.longitude - HistoryData[posIndex].lng) > 0.0002)
          setRegion({
            latitude: HistoryData[posIndex].lat,
            longitude: HistoryData[posIndex].lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          })

        setProgressBarValue((posIndex + 1) / datalength)
        posIndex++;
      }

      // timeInterval = setInterval(moveVehicle, 1000);
      setTimeInterval(setInterval(moveVehicle, 1000));
      // intervalList.push(timeInterval);
      // setIntervalList(intervalList)
      console.log("timeInterval after SET:::::", timeInterval)

    }
  }

  return (
    <SafeAreaView>
      {showDataRangePicker ? (
        <View style={styles.container}>
          <DateRangePicker
            onSelectDateRange={(range) => {
              setRange(range);
            }}
            blockSingleDateSelection={true}
            responseFormat="YYYY-MM-DD"
            maxDate={moment()}
            minDate={moment().subtract(100, "days")}
            selectedDateContainerStyle={styles.selectedDateContainerStyle}
            selectedDateStyle={styles.selectedDateStyle}
            clearBtnTitle=""
            confirmBtnTitle=''
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', padding: 8, borderRadius: 4, margin: 8, borderColor: '#EEEEEE', borderWidth: 1 }}>
            <Text>FROM: {selectedRange.firstDate}</Text>
            <Text>TO: {selectedRange.secondDate}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <TouchableOpacity style={styles.confirmButton} onPress={confirmDataRangeSelect}>
              <Text style={{ color: 'white', fontSize: 14 }}>CONFIRM</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={() => setshowDataRangePicker(false)}>
              <Text style={{ color: 'white', fontSize: 14 }}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <StatusBar backgroundColor={'#18567F'} barStyle={'light'} />
      <MapView
        initialRegion={region}
        region={region}
        onRegionChangeComplete={handleMapRegionChange}

        style={{ width: wp('97%'), height: hp('90%'), borderRadius: 10, alignSelf: 'center', margin: 5 }}>
        <Marker
          key={vehicle._id}
          ref={markerRef}
          coordinate={{ latitude: markerLat, longitude: markerLng }}
          onPress={(event) => {
          }}
        >
          <View style={{ alignItems: 'center', borderWidth: 0.8, borderColor: 'red', width: 34, height: 18, alignSelf: 'center' }}>
            <Image style={{ width: 32, height: 16 }} source={require('../../assets/bigcar.png')} />
          </View>
        </Marker>
        <Polyline
          coordinates={polylineData}
          strokeColor="#18567F"
          strokeWidth={4}
          fillColor="#18567F"
        />
      </MapView>

      {/* <View style={styles.view6}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 7 }}>
          <Text style={{ fontSize: 12, fontWeight: '500', textDecorationLine: 'underline' }}>
            arrêt
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 10, fontWeight: '400' }}>
              2023-03-03
            </Text>
            <Text style={{ fontSize: 10, fontWeight: '400', color: '#18567F' }}>
              | 02:13:15
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 7 }}>
          <Text style={{ fontSize: 12, fontWeight: '500', textDecorationLine: 'underline' }}>
            démarrer
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 10, fontWeight: '400' }}>
              2023-03-03
            </Text>
            <Text style={{ fontSize: 10, fontWeight: '400', color: '#18567F' }}>
              | 02:13:15
            </Text>
          </View>

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 9 }}>
          <Text style={{ fontSize: 9, fontWeight: '500', color: '#18567F' }}>
            Show complete address
          </Text>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="arrow-right" size={10} color="#18567F" style={{ alignSelf: 'center', paddingTop: 3 }} />
          </IconComponentProvider>
        </View>
      </View> */}

      <View style={styles.view2}>
        <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-evenly', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={handleStartPlay}
          >
            <IconComponentProvider IconComponent={MaterialCommunityIcons}>
              <Icon name={`${onVehiclePlay ? "stop-circle-outline" : "play-circle-outline"}`} size={20} color="#18567F" style={{}} />
            </IconComponentProvider>
          </TouchableOpacity>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={progressBarValue}
            style={{ color: '#18567F', width: wp('70%'), }} />
          {/* <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="fast-forward" size={20} color="#000000" />
          </IconComponentProvider> */}
        </View>
        <TouchableOpacity
          onPress={() => setshowDataRangePicker(true)}
        >
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', width: wp('70%'), alignSelf: 'center' }}>
            <Text style={{ fontSize: 11, fontWeight: '400', alignSelf: 'center' }}>{selectedRange.firstDate}</Text>
            <Text style={{ fontSize: 11, fontWeight: '400', alignSelf: 'center' }}>00:00:00 </Text>
            <Text style={{ fontSize: 11, fontWeight: '400', alignSelf: 'center' }}> - </Text>
            <Text style={{ fontSize: 11, fontWeight: '400', alignSelf: 'center' }}> {selectedRange.secondDate}</Text>
            <Text style={{ fontSize: 11, fontWeight: '400', alignSelf: 'center' }}>00:00:00</Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', marginVertical: hp('2%') }}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignSelf: 'center', width: wp('75%') }}>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../../assets/clock.png')} style={{ width: 15, height: 15 }} />
                <Text style={{ fontSize: 11, fontWeight: '600', marginLeft: 5 }}>{currentTime}</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../../assets/meter1.png')} style={{ width: 15, height: 15 }} />
                <Text style={{ fontSize: 11, fontWeight: '600', marginLeft: 5 }}>0Km/h</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Image source={require('../../assets/meter1.png')} style={{ width: 15, height: 15 }} />
                <Text style={{ fontSize: 11, fontWeight: '600', marginLeft: 5 }}>167.08Km</Text>
              </View>
            </View>
          </IconComponentProvider>
        </View>
        {/* <Text style={{ fontSize: 9, fontWeight: '400', marginTop: hp('0.5%'), marginLeft: wp('18%'), marginBottom: hp('2.5%') }}>{currentDate}</Text> */}
      </View>
      {/* </TouchableOpacity> */}
    </SafeAreaView >
  )
}

export default Historiquie2;

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
    width: 38, height: 38, borderRadius: 30,
    backgroundColor: '#18567F', justifyContent: 'center', alignItems: 'center', position: 'absolute',
  },
  view2: {
    position: 'absolute',
    width: wp('94%'),
    alignSelf: 'center',
    // height: 160,
    backgroundColor: 'white',
    borderRadius: 10,

    bottom: hp('8%')
  },
  view3: { flexDirection: 'row', marginHorizontal: 40, marginTop: 20 },
  view4: {
    position: 'absolute',
    width: 342,
    height: 55,
    backgroundColor: '#FFFF',
    borderRadius: 10,
    top: 80,
    left: 10,
    flexDirection: 'row'
  },
  view5: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    borderWidth: 0.7,
    borderRadius: 20
  },
  view6: {
    position: 'absolute',
    backgroundColor: '#ffff',
    width: wp('60%'),
    borderRadius: 10,
    left: wp('4%'),
    top: hp('27%'),
    paddingBottom: 5,
    paddingTop: 8,
    zIndex: 99,
    paddingRight: 10
  },

  container: {
    zIndex: 999,
    backgroundColor: 'white',
    position: 'absolute',
    width: wp('80%'),
    borderRadius: 20,
    padding: 10,
    alignSelf: 'center',
    marginTop: hp('10%')
  },
  selectedDateContainerStyle: {
    height: 35,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#18567F",
    borderRadius: 70

  },
  selectedDateStyle: {
    fontWeight: "bold",
    color: "white",
  },
  confirmButton: {
    backgroundColor: "#18567F",
    width: '48%',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center'
  }
});