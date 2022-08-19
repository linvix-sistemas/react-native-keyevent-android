import { DeviceEventEmitter, EmitterSubscription } from 'react-native';

class KeyEventAndroid {
  listenerKeyUp: EmitterSubscription | undefined;
  listenerKeyDown: EmitterSubscription | undefined;
  listenerKeyMultiple: EmitterSubscription | undefined;

  onKeyDownListener(callback: (ev: any) => void) {
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

  onKeyUpListener(callback: (ev: any) => void) {
    this.removeKeyUpListener();
    this.listenerKeyUp = DeviceEventEmitter.addListener('onKeyUp', callback);
  }

  removeKeyUpListener() {
    if (this.listenerKeyUp) {
      this.listenerKeyUp.remove();
      this.listenerKeyUp = undefined;
    }
  }

  onKeyMultipleListener(callback: (ev: any) => void) {
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
}

export default new KeyEventAndroid();
