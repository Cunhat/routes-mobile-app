import { Platform, Dimensions } from 'react-native';
import * as Device from 'expo-device';


export const getDeviceHeaderHeight = () => {
    const test = Device.modelName

  if (Platform.OS === 'ios') return 44;
  else return 0; 
  
};

export const createDaysArray = (number: number) => {
  return [...Array(number).keys()].map(i => ({ title: (i + 1).toString() }));
};