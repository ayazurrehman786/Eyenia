
import * as React from 'react';
import { View, Text, SafeAreaView, TextInput, Modal, ActivityIndicator } from 'react-native';
import { StyleSheet, ToastAndroid } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useSelector, useDispatch } from 'react-redux'
import { login } from "../actions/auth";

export default function LoginBoard({ navigation }) {
  const loggingIn = useSelector(state => state.auth.loggingIn)
  const dispatch = useDispatch()
  const userReducer = useSelector(state => state.auth);

  const [username, setUsername] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);
  function validate() {
    if (username === "" || pass === "") {
      ToastAndroid.show(
        'Please Enter Username and Password',
        ToastAndroid.SHORT,
      );
    } else {
      dispatch(login(username, pass, navigation))
      // navigation.navigate('MainBoard');
    };
  }

  return (

    <SafeAreaView style={styles.view1}>

      <Modal visible={loggingIn} transparent={true}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
          <ActivityIndicator size="large" color="rgba(54, 52, 53, 1)" />
        </View>
      </Modal>
      <Image source={require('../../assets/signuplogo.png')} style={styles.image} />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Login back</Text>
      <Text style={styles.t1}>Sign in with your account to continue !</Text>
      <View style={styles.v4}>
        <View style={styles.iconArea}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="account" size={16} color="rgba(24, 86, 127, 1)" />
          </IconComponentProvider>
        </View>
        <TextInput type='text' style={styles.in1} placeholder='Email or number phone' onChangeText={(val) => { setUsername(val) }} />
      </View>
      <View style={styles.v4}>
        <View style={styles.iconArea}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="lock-outline" size={16} color="rgba(24, 86, 127, 1)" />
          </IconComponentProvider>
        </View>
        <TextInput type='text' secureTextEntry={showPassword} style={[styles.in1, { width: wp('62%') }]} placeholder='Password' onChangeText={(val) => { setPass(val) }} />
        <IconComponentProvider IconComponent={MaterialCommunityIcons} >
          {showPassword ? (
            <TouchableOpacity onPressIn={() => { setShowPassword(false) }} >
              <Icon name="eye-outline" size={20} color="rgba(24, 86, 127, 1)" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPressOut={() => setShowPassword(true)}>
              <Icon name="eye-off-outline" size={20} color="rgba(24, 86, 127, 1)" />
            </TouchableOpacity>
          )}
        </IconComponentProvider>
      </View>
      <TouchableOpacity style={{ alignSelf: 'flex-end', marginHorizontal: wp('8%') }} onPress={() => { navigation.navigate('ForgotPassword') }}>
        <Text style={styles.t2}>Forgot Password?</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.to1} onPress={() => { validate() }}> */}
      <TouchableOpacity style={styles.to1} onPress={() => { validate() }}>
        <Text style={styles.t3}>Login</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', marginTop: '7%' }}>
        <Text style={{ fontSize: 12, fontWeight: '600', opacity: 0.5 }}>Dont have an account?</Text>
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => { navigation.navigate('SignupBoard') }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#18567F' }}>SignUp</Text>
        </TouchableOpacity></View>
      <Text style={{ marginTop: '5%', fontSize: 12, fontWeight: '500', color: '#0A2049' }}>OR</Text>
      <View style={{ flexDirection: 'row', marginTop: '5%' }}>
        <View style={styles.siteIcon}>
          <TouchableOpacity>
            <Image source={require('../../assets/google.png')} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.siteIcon}>
          <TouchableOpacity>
            <Image source={require('../../assets/facebook.png')} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={styles.siteIcon}>
          <TouchableOpacity>
            <Image source={require('../../assets/instagram.png')} style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={{
        width: 124, height: 5, borderRadius: 5, alignSelf: 'center',
        backgroundColor: 'rgba(54, 52, 53, 1)', position: 'absolute', top: hp('103%')
      }}>
      </TouchableOpacity>
    </SafeAreaView>
  );
  // }
}
const styles = StyleSheet.create({
  image: {
    marginTop: 67,
    width: 70,
    height: 60,
    marginBottom: 30
  },
  view1: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  t1: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 9,
    marginBottom: 0,
    opacity: 0.5
  },
  in1: {
    padding: 4,
    borderRadius: 10,
    height: 40,
    width: wp('70%'),
  },
  t2: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.5,
    marginVertical: hp('2%'),
  },
  to1: {
    width: wp('83%'),
    height: hp('8%'),
    backgroundColor: '#18567F',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  t3: {
    fontSize: 13,
    fontWeight: '700',
    color: 'white'
  },
  v4: {
    flexDirection: "row",
    alignItems: 'center',
    borderWidth: 1,
    marginTop: hp('3%'),
    borderColor: '#18567F8C',
    borderRadius: 10,
    marginHorizontal: 40,
    width: wp('85%'),
    height: hp('7%')
  },
  iconArea: {
    width: 24,
    height: 24,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(24, 86, 127, 0.16)',
    marginHorizontal: 10
  },
  siteIcon: {
    borderWidth: 1,
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#18567F',
    marginHorizontal: 10
  }
});