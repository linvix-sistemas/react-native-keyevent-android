import { DeviceEventEmitter } from 'react-native';

type KeyUpDownType = {
  pressedKey: string;
  action: number;
  keyCode: number;
  enterPressed: boolean;
};

type MultipleKeyType = {
  pressedKey: string;
  action: number;
  keyCode: number;
  characters?: number;
  repeatcount?: number;
};

class KeyEventAndroid {
  onKeyDownListener(callback: (ev: KeyUpDownType) => void) {
    const listener = DeviceEventEmitter.addListener('onKeyDown', callback);
    return () => {
      listener?.remove();
    };
  }

  onKeyUpListener(callback: (ev: KeyUpDownType) => void) {
    const listener = DeviceEventEmitter.addListener('onKeyUp', callback);
    return () => {
      listener?.remove();
    };
  }

  onKeyMultipleListener(callback: (ev: MultipleKeyType) => void) {
    const listener = DeviceEventEmitter.addListener('onKeyMultiple', callback);
    return () => {
      listener?.remove();
    };
  }

  onDispatchKeyListener(callback: (ev: KeyUpDownType) => void) {
    const listener = DeviceEventEmitter.addListener('onDispatchKey', callback);
    return () => {
      listener?.remove();
    };
  }

  onDispatchBarcodeReadListener(callback: (barcode: string) => void) {
    const listener = DeviceEventEmitter.addListener(
      'onDispatchBarcodeRead',
      callback
    );
    return () => {
      listener?.remove();
    };
  }
}

export default new KeyEventAndroid();
