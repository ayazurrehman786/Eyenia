import axios from 'axios';
import { API_URL } from '../constants/url';

function addNotification(token, userId, type, vehicle, time) {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/notifications/createNotify`, {
      token, userId, type, vehicle, time
    }).then(async (response) => {
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

function showNotifications(token, userId) {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/notifications/showNotify`, {
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

export const notificationService = {
  addNotification,
  showNotifications,
};
