
import * as React from 'react';
import { View, Text, SafeAreaView, TextInput, StatusBar, Modal , ActivityIndicator} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity, ToastAndroid } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useSelector, useDispatch } from 'react-redux'
import { signup } from "../actions/auth";

export default function SignupBoard({ navigation }) {
  const dispatch = useDispatch();
  const signingUp = useSelector(state => state.auth.signingUp);

  const [username, setUsername] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(true);

  function onSignUp() {
    if (username === "" || pass === "" || email === "" || phone === "") {
      ToastAndroid.show(
        'Please Enter User Information',
        ToastAndroid.SHORT,
      );
    } else {
      dispatch(signup(username, email, phone, pass, navigation));
    }
  }

  return (
    <SafeAreaView style={styles.view1}>
      <Modal visible={signingUp} transparent={true}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
          <ActivityIndicator size="large" color="rgba(54, 52, 53, 1)" />
        </View>
      </Modal>
      <Image source={require('../../assets/signuplogo.png')} style={styles.image} />
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Sign Up</Text>
      <Text style={styles.t1}>Sign up for new account to continue !</Text>
      <View style={styles.v4}>
        <View style={styles.iconArea}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="account" size={16} color="rgba(24, 86, 127, 1)" />
          </IconComponentProvider>
        </View>
        <TextInput type='text' style={styles.in1} placeholder='Username' onChangeText={(val) => { setUsername(val) }} />
      </View>
      <View style={styles.v4}>
        <View style={styles.iconArea}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="phone-in-talk-outline" size={16} color="rgba(24, 86, 127, 1)" />
          </IconComponentProvider>
        </View>
        <TextInput type='text' style={styles.in1} placeholder='Phone Number (facultatif)' keyboardType='numeric' onChangeText={(val) => { setPhone(val) }} />
      </View>
      <View style={styles.v4}>
        <View style={styles.iconArea}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="email-outline" size={16} color="rgba(24, 86, 127, 1)" />
          </IconComponentProvider>
        </View>
        <TextInput type='text' style={styles.in1} placeholder='Email' onChangeText={(val) => { setEmail(val) }} />
      </View>
      <View style={styles.v4}>
        <View style={{
          width: 30, height: 30, borderRadius: 80,
          justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(24, 86, 127, 0.16)', marginHorizontal: 10
        }}><IconComponentProvider IconComponent={MaterialCommunityIcons}>
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
      <TouchableOpacity style={styles.to1} onPress={() => { onSignUp() }}>
        <Text style={styles.t3}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{
        width: 124, height: 5, borderRadius: 5, alignSelf: 'center', backgroundColor: 'rgba(54, 52, 53, 1)',
        position: 'absolute', top: hp('103%')
      }}>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', }}><Text style={[styles.t2, { opacity: 0.5 }]}>Already have account?</Text>
        <TouchableOpacity onPress={() => { navigation.navigate('LoginBoard') }}>
          <Text style={[styles.t2, { marginLeft: 2, color: 'rgba(24, 86, 127, 1)' }]}>Login</Text></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();
const styles = StyleSheet.create({
  image: {
    marginTop: '20%',
    width: 70,
    height: 60,
    marginBottom: 25
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
    width: '100%',
  },
  t2: {
    fontSize: 12,
    fontWeight: '500',
    opacity: 0.9,
    marginVertical: hp('3%'),
  },
  to1: {
    width: wp('83%'),
    height: hp('8%'),
    backgroundColor: '#18567F',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp('3%')
  },
  t3: {
    fontSize: 12,
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
  t4: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20
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
});