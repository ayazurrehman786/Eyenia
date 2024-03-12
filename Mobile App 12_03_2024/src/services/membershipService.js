import axios from 'axios';
import { API_URL } from '../constants/url';

function recharge(token, email, username, 
  cardNumber, cardCVV, deviceExpirateDate, amount, deviceImei, expiryMonth, expiryYear) {
  return new Promise((resolve, reject) => {
    axios.post(`${API_URL}/payment/charge`, {
      token, 
      email, 
      name: username, 
      cardNumber, 
      cardCVC:cardCVV,
      amount, 
      deviceImei,
      cardExpMonth:expiryMonth,
      cardExpYear: expiryYear,
      expirateDate: deviceExpirateDate
    }).then(async (response) => {
      try {
        resolve(response);
      } catch (e) { 
        reject(e) }
    }).catch((err) => {
      //console.log("123456", err.response.data);
      reject(err)
    });
  });
}
export const membershipService = {
  recharge
};
