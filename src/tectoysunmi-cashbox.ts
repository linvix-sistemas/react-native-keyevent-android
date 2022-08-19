import { NativeModules } from 'react-native';

const { Keyevent-android } = NativeModules;

const AbrirGaveta = async () => {
  try {
    return await Keyevent-android.openCashBox();
  } catch (error) {
    throw error;
  }
};

const NativeModuleTectToySunmiCashBoxSDK = {
  AbrirGaveta,
};

export default NativeModuleTectToySunmiCashBoxSDK;
