import axios from 'axios';
import { API_URL } from '../constants/url';


function teltonika(token, userId) {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/teltonika`, {
      token, 
      userId
    }).then(async (response) => {
      try {
        //await setAuthAsyncStorage(response);
        resolve(response);
      } catch (e) { reject(e) }
    }).catch((err) => {
      reject(err)
    });
  });
}

export const teltonikaService = {
  teltonika
};
