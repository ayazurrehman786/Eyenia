
import * as React from 'react';
import { StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons, Entypo } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen'
import Tip from './src/screens/Tip';
import Board from './src/screens/Board';
import LoginBoard from './src/screens/LoginBoard';
import SignupBoard from './src/screens/SignupBoard';
import ForgotPassword from './src/screens/ForgotPassword';
import MapScreen from './src/screens/MapScreen'
import Add_vehicle from './src/screens/Add_vehicle';
import List from './src/screens/List';
import Regiage from './src/screens/Regiage';
import Zone_dalerte from './src/screens/Zone_dalerte';
import Barriere from './src/screens/Barriere'
import Historiue from './src/screens/Historiue';
import Historiquie2 from './src/screens/Historiquie2';
import Details from './src/screens/Details';
import Membership from './src/screens/Membership';
import Membership2 from './src/screens/Membership2';
import Driver_detail from './src/screens/Driver_detail';
import Notification_Setting from './src/screens/Notification_Setting';
import Notifications from './src/screens/Notifications';
import Profile from './src/screens/Profile';
import EditGeoData from './src/screens/EditGeoData';

import store from './src/store';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const bottomNavHeight = Platform.OS === 'android' ? 56 : 49;

export default function App() {

  // function MapStack(props) {

  //   return (
  //     <Stack.Navigator initialRouteName="MapScreen"
  //       screenOptions={{
  //         headerShown: false,
  //         gestureEnabled: true,
  //         gestureDirection: 'horizontal',
  //         tabBarVisible: 'false'
  //       }}>
  //       <Stack.Screen name='MapScreen' component={MapScreen}
  //         options={{
  //           headerShown: false,
  //           presentation: 'modal',
  //           animationTypeForReplace: 'push',
  //           animation: 'slide_from_right'
  //         }} />

  //     </Stack.Navigator>
  //   )
  // }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Eyenia" screenOptions={{
          headerShown: false,
          gestureEnabled: true, gestureDirection: 'horizontal'
        }}>
          <Stack.Screen name="Eyenia" component={HomeScreen} />
          <Stack.Screen name="Tip" component={Tip} />
          <Stack.Screen name="Board" component={Board} />
          <Stack.Screen name="LoginBoard" component={LoginBoard} />
          <Stack.Screen name='SignupBoard' component={SignupBoard} />
          <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
          <Stack.Screen name='MainBoard' component={AppStack} />
          <Stack.Screen name='Barriere' component={Barriere} />
          <Stack.Screen name='EditGeoData' component={EditGeoData} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );


  function AppStack({ navigation }) {

    return (
      <Tab.Navigator
        initialRouteName="MapSceen"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#18567F',
        }}
        options={{
          headerShown: false
        }}
      >
        <Tab.Screen
          name="MapScreen"
          component={MapScreen}
          options={({ route }) => ({
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home-outline" color={color} size={size} />
            )
          })}

        />
        <Tab.Screen
          name="List"
          component={List}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="clipboard-text-outline" color={color} size={size} />
            ),
            headerStyle: {
              backgroundColor: 'white',
            },
            headerShown: true,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                name="arrow-back-circle-outline"
                size={32}
                color="#232339"
                style={{ marginLeft: 16 }}
                onPress={() => { navigation.navigate("MapScreen") }}
              />
            ),
            headerTitleStyle: {
              color: 'black',
              fontSize: 20,
            },
          }}
        />
        <Tab.Screen
          name="Add_vehicle"
          component={Add_vehicle}
          options={{
            tabBarButton: () => (
              <TouchableOpacity style={styles.plusContainer} onPress={() => { navigation.navigate('Add_vehicle') }} >
                <Ionicons
                  name="add"
                  size={24}
                  color="white"
                  alignSelf="center"
                />
              </TouchableOpacity>
            ),
            headerStyle: {
              backgroundColor: '#18567F',
            },
            headerShown: true,
            headerTitleAlign: 'center',
            headerTitle: 'Add New Vehicle',
            headerLeft: () => (
              <Ionicons
                name="arrow-back-circle-outline"
                size={32}
                color="white"
                style={{ marginLeft: 16 }}
                onPress={() => { navigation.navigate('MapScreen') }}
              />
            ),
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
            },
          }}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{
            tabBarIcon: ({ color, size, notifyEmpty }) => (
              !notifyEmpty ? (
                <MaterialCommunityIcons name="bell-badge-outline" color={color} size={size} />
              ) : (
                <MaterialCommunityIcons name="bell-outline" color={color} size={size} />
              )
            ),
            headerStyle: {
              backgroundColor: '#18567F',
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                name="arrow-back-circle-outline"
                size={32}
                color="white"
                style={{ marginLeft: 16 }}
                onPress={() => { navigation.navigate("List") }}
              />
            ),
            headerShown: true,
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
            },
            // tabBarBadge: 3,
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={size} />
            ),
            headerStyle: {
              backgroundColor: '#18567F',
            },
            backBehavior: "history",
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                name="arrow-back-circle-outline"
                size={32}
                color="white"
                style={{ marginLeft: 16 }}
                onPress={() => { navigation.navigate("Notifications") }}
              />
            ),
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
            },
            headerShown: true,
          }}
        />
        <Tab.Screen
          name="Regiage"
          component={Regiage}
          options={{
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                name="arrow-back-circle-outline"
                size={32}
                color="#232339"
                style={{ marginLeft: 16 }}
                onPress={() => { navigation.navigate("MapScreen") }}
              />
            ),
            headerShown: true,
            headerTitleStyle: {
              color: 'black',
              fontSize: 20,
            },
            headerTitle: 'Regiage',
            headerShown: true,
            tabBarItemStyle: { display: 'none' }
          }}
        />
        <Tab.Screen
          name="Details"
          component={Details}
          options={{
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                name="arrow-back-circle-outline"
                size={32}
                color="#232339"
                style={{ marginLeft: 16 }}
                onPress={() => { navigation.navigate('MapScreen') }}
              />
            ),
            headerShown: true,
            headerTitleStyle: {
              color: 'black',
              fontSize: 20,
            },
            headerTitle: 'Detail appareil',
            headerShown: true,
            tabBarItemStyle: { display: 'none' }
          }}
        />
        <Tab.Screen
          name="Zone_dalerte"
          component={Zone_dalerte}
          options={{
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                name="arrow-back-circle-outline"
                size={32}
                color="#232339"
                style={{ marginLeft: 16 }}
                onPress={() => { navigation.navigate('MapScreen') }}
              />
            ),
            headerShown: true,
            headerTitleStyle: {
              color: 'black',
              fontSize: 20,
            },
            headerTitle: 'Zone d`alerte',
            headerShown: true,
            tabBarItemStyle: { display: 'none' }
          }}
        />
        <Tab.Screen
          name="Membership"
          component={Membership}
          options={{
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                name="arrow-back-circle-outline"
                size={32}
                color="#232339"
                style={{ marginLeft: 16 }}
                onPress={() => { navigation.navigate('MapScreen') }}
              />
            ),
            headerShown: true,
            headerTitleStyle: {
              color: 'black',
              fontSize: 20,
            },
            headerTitle: 'Membership',
            headerShown: true,
            tabBarItemStyle: { display: 'none' }
          }}
        />
        <Tab.Screen
          name="Membership2"
          component={Membership2}
          options={{
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                name="arrow-back-circle-outline"
                size={32}
                color="#232339"
                style={{ marginLeft: 16 }}
                onPress={() => { navigation.navigate('MapScreen') }}
              />
            ),
            headerShown: true,
            headerTitleStyle: {
              color: 'black',
              fontSize: 18,
            },
            headerTitle: 'Recharge international',
            headerShown: true,
            tabBarItemStyle: { display: 'none' }
          }}
        />
        <Tab.Screen
          name="NotificationSetting"
          component={Notification_Setting}
          options={{
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Ionicons
                name="arrow-back-circle-outline"
                size={32}
                color="#232339"
                style={{ marginLeft: 16 }}
                onPress={() => { navigation.navigate('MapScreen') }}
              />
            ),
            headerShown: true,
            headerTitleStyle: {
              color: 'black',
              fontSize: 18,
            },
            headerTitle: 'Notification settings',
            headerShown: true,
            tabBarItemStyle: { display: 'none' }
          }}
        />
        <Tab.Screen
          name="Historique"
          component={Historiue}
          options={{
            headerTitleAlign: 'center',
            headerTitle: 'Historique',
            headerStyle: {
              backgroundColor: '#18567F',
            },
            headerLeft: () => (
              <Ionicons
                name="arrow-back-circle-outline"
                size={32}
                color="white"
                style={{ marginLeft: 16 }}
                onPress={() => { navigation.navigate('MapScreen') }}
              />
            ),
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
            },
            headerShown: true,
            tabBarItemStyle: { display: 'none' }
          }}
        />
        <Tab.Screen
          name="Historique2"
          component={Historiquie2}
          options={{
            headerTitleAlign: 'center',
            headerTitle: 'Historique',
            headerStyle: {
              backgroundColor: '#18567F',
            },
            headerLeft: () => (
              <Ionicons
                name="arrow-back-circle-outline"
                size={32}
                color="white"
                style={{ marginLeft: 16 }}
                onPress={() => { navigation.navigate('MapScreen') }}
              />
            ),
            headerTitleStyle: {
              color: 'white',
              fontSize: 20,
            },
            headerShown: true,
            tabBarItemStyle: { display: 'none' }
          }}
        />
      </Tab.Navigator>
    )
  }
}
const styles = StyleSheet.create({
  plusContainer: {
    backgroundColor: '#18567F',
    borderRadius: bottomNavHeight / 3,
    width: bottomNavHeight * 5 / 6,
    height: bottomNavHeight * 5 / 6,
    marginTop: -bottomNavHeight / 2,
    marginBottom: bottomNavHeight / 2,
    flexDirection: 'row',
    justifyContent: 'center',
    // zIndex: 1000,
    alignItems: 'center',
    elevation: 10
  },
  plusText: {
    fontSize: bottomNavHeight / 2,
    color: '#fff',
    alignSelf: 'center',
    fontWeight: '300'
  },
  to1: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFF',
    borderColor: '#FFFF',
    left: 10
  },
});