import {
  AUTH_ERR_LOG_IN,
  AUTH_ERR_LOG_OUT,
  AUTH_LOGGED_IN,
  AUTH_LOGGING_IN,
  AUTH_LOGGING_OUT,
  AUTH_LOGOUT,
  AUTH_SIGNED_UP,
  AUTH_SIGNING_UP,
  AUTH_ERR_SIGNUP,
  AUTH_NEW_USER,
} from "../constants/auth";

import { toastr } from "../services/navRef";
import { userService } from "../services/userService";
import { teltonika } from "./teltonika";

export const loggingIn = (loggingIn) => ({
  type: AUTH_LOGGING_IN,
  payload: loggingIn
});

export const loggedIn = (data) => ({
  type: AUTH_LOGGED_IN,
  payload: data,
});

export const errorLogIn = (errorMessage) => ({
  type: AUTH_ERR_LOG_IN,
  payload: errorMessage,
});

export const login = (username, password, navigate) => (dispatch) => {
  dispatch(loggingIn(true));
  userService.login(username, password).then(async (res) => {
    console.log(res.data);
    await dispatch(loggedIn(res.data));
    //await dispatch(teltonika(res.data.token, res.data.user.id));
    await navigate.navigate('MainBoard');
    console.log("login")
    toastr('Login Succeed!');
  }).catch(error => {
    if (error.response) {
      // Handle error with HTTP status code
      //console.error(error.response.data);
      toastr('username or password is incorrect');
    } else if (error.request) {
      // Handle error connecting to server
      //console.error('Error connecting to server:', error.request);
      toastr('Error connecting to server.');
    } else {
      // Handle other errors
      //console.error('Error:', error.message);
      toastr('Error:', error.message);
    }
    dispatch(errorLogIn('Wrong username or password'));

  }).finally(() => {
    dispatch(loggingIn(false));
  }
  )
};

export const loggedOut = () => ({
  type: AUTH_LOGOUT,
});

export const loggingOut = (lOut) => ({
  type: AUTH_LOGGING_OUT,
  payload: lOut,
});

export const errorLogOut = (errorMessage) => ({
  type: AUTH_ERR_LOG_OUT,
  payload: errorMessage,
});

export const logout = () => async (dispatch, getState) => {
  dispatch(loggingOut(true));
  await userService.logout(getState).then((res) => {
    dispatch(loggedOut());
  }).catch((err) => {
    dispatch(errorLogOut('Error logging out.'));
  }).finally(() => {
    dispatch(loggingOut(false));
  });
};


export const signup = (username, email, phone, password, navigate) => (dispatch) => {
  dispatch(signingUp(true));
  console.log("username", username)
  userService.signup(username, email, phone, password)
    .then(async (res) => {
      console.log("sign up::::", res.data)
      await dispatch(signedUp(res.data));
      await navigate.navigate('LoginBoard');
      toastr('Sign up Succeed!');
    })
    .catch((error) => {
      if (error.response) {
        // Handle error with HTTP status code
        console.error(error.response.data);
        toastr('SignUp Failed!');
      }
      else if (error.request) {
        // Handle error connecting to server
        //console.error('Error connecting to server:', error.request);
        toastr('Error connecting to server.');
      }
      else {
        // Handle other errors
        //console.error('Error:', error.message);
        toastr('Error:', error.message);
      }
      dispatch(errorSignUp('SignUp Failed!'));
    })
    .finally(() => {
      dispatch(signingUp(false));
    });
};

export const changePassword = (userId, oldPassword, newPassword) => (dispatch) => {
  userService.changePassword(userId, oldPassword, newPassword)
    .then(async (res) => {
      toastr(res.data.message);
      console.log(res.data.message);
    })
    .catch((error) => {
      if (error.response) {
        // Handle error with HTTP status code
        // console.error(error.response.data.message);
        toastr(error.response.data.message);
      }
      else if (error.request) {
        // Handle error connecting to server
        toastr('Error connecting to server.');
      }
      else {
        // Handle other errors
        //console.error('Error:', error.message);
        toastr('Error:', error.message);
      }
    })
    .finally(() => {
    });
};

export const changeEmail = (userId, newEmail) => (dispatch) => {

  userService.changeEmail(userId, newEmail)
    .then(async (res) => {
      toastr(res.data.message);
      console.log("res.data", res.data.user);
      dispatch(changeUser(res.data.user));
    })
    .catch((error) => {
      if (error.response) {
        toastr(error.response.data.message);
      }
      else if (error.request) {
        // Handle error connecting to server
        toastr('Error connecting to server.');
      }
      else {
        // Handle other errors
        //console.error('Error:', error.message);
        // toastr('Error:', error.message);
      }
    })
    .finally(() => {
    });
};

export const changeUserName = (userId, newUserName) => (dispatch) => {

  userService.changeUserName(userId, newUserName)
    .then(async (res) => {
      toastr(res.data.message);
      await dispatch(changeUser(res.data.user));
      console.log(res.data.message);
    })
    .catch((error) => {
      if (error.response) {
        // Handle error with HTTP status code
        // console.error(error.response.data.message);
        toastr(error.response.data.message);
      }
      else if (error.request) {
        // Handle error connecting to server
        toastr('Error connecting to server.');
      }
      else {
        // Handle other errors
        //console.error('Error:', error.message);
        // toastr('Error:', error.message);
      }
    })
    .finally(() => {
    });
};

export const changePhoneNumber = (userId, newPhoneNumber) => (dispatch) => {

  userService.setPhoneNumber(userId, newPhoneNumber)
    .then(async (res) => {
      console.log("res.data.message", res.data.message);
      toastr(res.data.message);
      await dispatch(changeUser(res.data.user));
      console.log(res.data.message);
    })
    .catch((error) => {
      if (error.response) {
        // Handle error with HTTP status code
        // console.error(error.response.data.message);
        toastr(error.response.data.message);
      }
      else if (error.request) {
        // Handle error connecting to server
        toastr('Error connecting to server.');
      }
      else {
        // Handle other errors
        //console.error('Error:', error.message);
        // toastr('Error:', error.message);
      }
    })
    .finally(() => {
    });
};

export const signingUp = (signingUp) => ({
  type: AUTH_SIGNING_UP,
  payload: signingUp
});

export const signedUp = (data) => ({
  type: AUTH_SIGNED_UP,
  payload: data,
});

export const errorSignUp = (errorMessage) => ({
  type: AUTH_ERR_SIGNUP,
  payload: errorMessage,
});

export const changeUser = (newUser) => ({
  type: AUTH_NEW_USER,
  payload: newUser,
});