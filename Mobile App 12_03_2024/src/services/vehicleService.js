import axios from 'axios';
import { API_URL } from '../constants/url';

function addVehicles(token, userId, vehicleName, deviceImei, deviceType, deviceModel, simNumber) {
  console.log("🚀 ~ file: vehicleService.js:5 ~ addVehicles ~ token, userId, vehicleName, deviceImei, deviceType, deviceModel, simNumber:", token, userId, vehicleName, deviceImei, deviceType, deviceModel, simNumber)
  return new Promise((resolve, reject) => {

    axios.post(`${API_URL}/vehicles/create`, {
      token, userId, vehicleName, deviceImei, deviceType, deviceModel, simNumber
    })
      .then(async (response) => {
        try {
          resolve(response);
        } catch (e) {
          reject(e)
        }
      }).catch((err) => {
        reject(err)
      });
  });
}

function showVehicles(token, userId) {

  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/maps`, {
      token, userId
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

function deleteVehicle(token, imei) {
  console.log(" token and imei are ", token, imei);
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/remove`, {
      token: token,
      deviceImei: imei
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

function deletePolygonData(token, deviceImei, index) {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/removePolygon`, {
      token: token,
      deviceImei: deviceImei,
      index: index
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

function setLimitSpeed(token, userId, deviceImei, speed) {
  console.log("token, userId, speed", token);
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/limitspeed`, {
      token: token,
      userId: userId,
      deviceImei: deviceImei,
      speed: speed

    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

function vehicleList(token, userId) {

  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/show`, {
      token, userId
    })
      .then(async (response) => {
        try {
          resolve(response);
        } catch (e) { reject(e) }
      })
      .catch((err) => {
        reject(err)
      });
  });
}

function vehicleHistory(token, deviceImei, fisrstDate, secondDate) {
  console.log("TOKEN:::::", token)
  console.log("deviceImei:::::", deviceImei)
  console.log("fisrstDate:::::", fisrstDate)
  console.log("secondDate:::::", secondDate)

  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/history`, {
      token, deviceImei, fisrstDate, secondDate
    })
      .then(
        async (response) => {
          try {
            resolve(response);
          }
          catch (e) {
            reject(e)
          }
        }
      )
      .catch((error) => {
        console.log("API ERROR")
        reject(error)
      });
  });
}

function confirmNotificationSettings(token, deviceImei,
  isVibration, isMovement, isStop, isEnterZone, isSortZone, isOverspeed, isDetachment) {

  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/update`, {
      token, deviceImei,
      isVibration, isMovement, isStop, isEnterZone, isSortZone, isOverspeed, isDetachment
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

function sendGprsIgnition(token, ip, port, value) {
  console.log("🚀 ~ file: vehicleService.js:110 ~ sendGprsIgnition ~ token, ip, port:", token, ip, port)

  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/ignition`, {
      token, ip, port, value
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
    console.log("🚀 ~ file: vehicleService.js:121 ~ returnnewPromise ~ token, ip, port:", token, ip, port)
  });
}

function sendGprsReset(token, ip, port) {
  console.log("🚀 ~ file: vehicleService.js:126 ~ sendGprsReset ~ token, ip, port:", token, ip, port)

  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/reset`, {
      token, ip, port
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

function sendGprsRestart(token, ip, port) {

  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/vehicles/ignition`, {
      token, ip, port
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

export const vehicleService = {
  addVehicles,
  showVehicles,
  vehicleList,
  vehicleHistory,
  deleteVehicle,
  sendGprsIgnition,
  sendGprsRestart,
  sendGprsReset,
  confirmNotificationSettings,
  setLimitSpeed,
  deletePolygonData
};
