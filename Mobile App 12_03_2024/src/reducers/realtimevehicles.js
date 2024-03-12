import {
  VEHICLE_SHOWING,
  VEHICLE_SHOWING_FAILED,
  VEHICLE_SHOWING_SUCCESS,
  VEHICLE_SET_PERIOD,
  VEHICLE_SELECTED_ID
} from '../constants/vehicles';

const REALTIME_INITIAL_STATE = {
  vehicles: [],
  isGettingVehicles: false,
  errorVehicleShow: '',
  receivePeriod: 5000,
  seletedvehicleID: 0
};

export default function (state = REALTIME_INITIAL_STATE, action) {
  switch (action.type) {

    case VEHICLE_SHOWING: {
      return {
        ...state,
        isGettingVehicles: action.payload,
      };
    }

    case VEHICLE_SHOWING_SUCCESS: {
      let vehicles = action.payload;
      return {
        ...state,
        vehicles,
        isGettingVehicles: false,
        errorVehicleShow: null,
      };
    }

    case VEHICLE_SHOWING_FAILED: {
      return {
        ...state,
        errorVehicleShow: action.payload,
      };
    }

    case VEHICLE_SET_PERIOD: {
      const { receivePeriod } = action.payload
      return {
        ...state,
        receivePeriod: receivePeriod
      };
    }
    case VEHICLE_SELECTED_ID: {
      const seletedvehicleID = action.payload;
      return {
        ...state,
        seletedvehicleID: seletedvehicleID
      }
    }
    default:
      return state;
  }
}
