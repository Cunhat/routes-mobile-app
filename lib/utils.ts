import { Platform, Dimensions } from 'react-native';
import * as Device from 'expo-device';


export const getDeviceHeaderHeight = () => {
    const test = Device.modelName

    console.log(test)
  if (Platform.OS === 'ios') return 44;
  else return 0; 
  
};