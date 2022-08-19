import { DeviceEventEmitter } from 'react-native';

class KeyEventAndroid {
  listenerKeyUp = null;
  listenerKeyDown = null;

  onKeyDownListener(callback) {
    this.removeKeyDownListener();
    this.listenerKeyDown = DeviceEventEmitter.addListener(
      'onKeyDown',
      callback
    );
  }

  removeKeyDownListener() {
    if (this.listenerKeyDown) {
      this.listenerKeyDown.remove();
      this.listenerKeyDown = null;
    }
  }

  onKeyUpListener(callback) {
    this.removeKeyUpListener();
    this.listenerKeyUp = DeviceEventEmitter.addListener('onKeyUp', callback);
  }

  removeKeyUpListener() {
    if (this.listenerKeyUp) {
      this.listenerKeyUp.remove();
      this.listenerKeyUp = null;
    }
  }

  onKeyMultipleListener(callback) {
    this.removeKeyMultipleListener();
    this.listenerKeyMultiple = DeviceEventEmitter.addListener(
      'onKeyMultiple',
      callback
    );
  }

  removeKeyMultipleListener() {
    if (this.listenerKeyMultiple) {
      this.listenerKeyMultiple.remove();
      this.listenerKeyMultiple = null;
    }
  }
}

export default new KeyEventAndroid();
