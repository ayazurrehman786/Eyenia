
import * as React from 'react';
import { View, Text, SafeAreaView, TextInput, StatusBar, Modal, ActivityIndicator } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { TouchableOpacity, ToastAndroid } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { IconComponentProvider, Icon } from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { useSelector, useDispatch } from 'react-redux'
import { signup } from "../actions/auth";

export default function ForgotPassword({ navigation }) {
  const dispatch = useDispatch();
  const signingUp = useSelector(state => state.auth.signingUp);

  const [username, setUsername] = React.useState('');
  
  function onResetPassword() {
    if (username === "") {
      ToastAndroid.show(
        'Please Enter User Information',
        ToastAndroid.SHORT,
      );
    } else {
      ToastAndroid.show(
        'Reset Password...',
        ToastAndroid.SHORT,
      );
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
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Forgot Password?</Text>
      <View style={styles.v4}>
        <View style={styles.iconArea}>
          <IconComponentProvider IconComponent={MaterialCommunityIcons}>
            <Icon name="account" size={20} color="rgba(24, 86, 127, 1)" />
          </IconComponentProvider>
        </View>
        <TextInput type='text' style={styles.in1} placeholder='Username' onChangeText={(val) => { setUsername(val) }} />
      </View>
      <TouchableOpacity style={styles.to1} onPress={() => { onResetPassword() }}>
        <Text style={styles.t3}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{
        width: 124, height: 5, borderRadius: 5, alignSelf: 'center', backgroundColor: 'rgba(54, 52, 53, 1)',
        position: 'absolute', top: hp('103%')
      }}>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

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
    marginTop: hp('12%'),
    elevation: 10
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
    marginTop: hp('6%'),
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
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(24, 86, 127, 0.16)',
    marginHorizontal: 10
  },
});