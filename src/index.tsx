import { DeviceEventEmitter, EmitterSubscription } from 'react-native';

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
  listenerKeyUp: EmitterSubscription | undefined;
  listenerKeyDown: EmitterSubscription | undefined;
  listenerKeyMultiple: EmitterSubscription | undefined;
  listenerDispatchKey: EmitterSubscription | undefined;

  onKeyDownListener(callback: (ev: KeyUpDownType) => void) {
    this.removeKeyDownListener();
    this.listenerKeyDown = DeviceEventEmitter.addListener(
      'onKeyDown',
      callback
    );
  }

  removeKeyDownListener() {
    if (this.listenerKeyDown) {
      this.listenerKeyDown.remove();
      this.listenerKeyDown = undefined;
    }
  }

  onKeyUpListener(callback: (ev: KeyUpDownType) => void) {
    this.removeKeyUpListener();
    this.listenerKeyUp = DeviceEventEmitter.addListener('onKeyUp', callback);
  }

  removeKeyUpListener() {
    if (this.listenerKeyUp) {
      this.listenerKeyUp.remove();
      this.listenerKeyUp = undefined;
    }
  }

  onKeyMultipleListener(callback: (ev: MultipleKeyType) => void) {
    this.removeKeyMultipleListener();
    this.listenerKeyMultiple = DeviceEventEmitter.addListener(
      'onKeyMultiple',
      callback
    );
  }

  removeKeyMultipleListener() {
    if (this.listenerKeyMultiple) {
      this.listenerKeyMultiple.remove();
      this.listenerKeyMultiple = undefined;
    }
  }

  onDispatchKeyListener(callback: (ev: KeyUpDownType) => void) {
    this.removeDispatchKeyListener();
    this.listenerDispatchKey = DeviceEventEmitter.addListener(
      'onDispatchKey',
      callback
    );
  }

  removeDispatchKeyListener() {
    if (this.listenerDispatchKey) {
      this.listenerDispatchKey.remove();
      this.listenerDispatchKey = undefined;
    }
  }
}

export default new KeyEventAndroid();
