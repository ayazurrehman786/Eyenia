import axios from 'axios';
import { AUTH_URL } from '../constants/url';
import { resetAuthAsyncStorage, setAuthAsyncStorage } from "./getAuthAsyncStorage";

function login(username, password) {
  return new Promise((resolve, reject) => {
    axios.post(`${AUTH_URL}/login`, {
      email: username,
      password,
    }).then(async (response) => {
      try {
        await setAuthAsyncStorage(response);
        resolve(response);
      }
      catch (e) {
        reject(e)
      }
    }).catch((err) => {
      reject(err)
    });
  });
}

function signup(username, email, phone, password) {
  return new Promise((resolve, reject) => {
    axios.post(`${AUTH_URL}/signup`, {
      name: username,
      password,
      email,
      phone
    }).then(async (response) => {
      try {
        await setAuthAsyncStorage(response);
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

function changePassword(userId, oldPassword, newPassword) {
  return new Promise((resolve, reject) => {
    axios.post(`${AUTH_URL}/changepassword`, {
      id: userId,
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
      .then(async (response) => {
        try {
          resolve(response);
        }
        catch (e) { reject(e) }
      })
      .catch((err) => {
        reject(err)
      });
  });
}

function changeEmail(userId, newEmail) {

  return new Promise((resolve, reject) => {
    axios.post(`${AUTH_URL}/changeemail`, {
      id: userId,
      newEmail: newEmail,
    })
      .then(async (response) => {
        try {
          resolve(response);
        }
        catch (e) { reject(e) }
      })
      .catch((err) => {
        reject(err)
      });
  });
}

function changeUserName(userId, newUserName) {
  return new Promise((resolve, reject) => {
    axios.post(`${AUTH_URL}/changeusername`, {
      id: userId,
      newUserName: newUserName,
    })
      .then(async (response) => {
        try {
          resolve(response);
        }
        catch (e) { reject(e) }
      })
      .catch((err) => {
        reject(err)
      });
  });
}

function setPhoneNumber(userId, newPhoneNumber) {
  return new Promise((resolve, reject) => {
    axios.post(`${AUTH_URL}/changephonenumber`, {
      id: userId,
      newPhoneNumber: newPhoneNumber,
    })
      .then(async (response) => {
        try {
          resolve(response);
        }
        catch (e) { reject(e) }
      })
      .catch((err) => {
        reject(err)
      });
  });
}

async function logout(getState) {
  return new Promise((resolve, reject) => {
    const currentState = getState();
    const { token } = currentState.auth;
    axios.get(`${AUTH_URL}/logout`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(async (response) => {
      resolve(response);
      await resetAuthAsyncStorage();
    }).catch((err) => reject(err));
  });
}

export const userService = {
  login,
  logout,
  signup,
  changePassword,
  changeEmail,
  changeUserName,
  setPhoneNumber,
};
