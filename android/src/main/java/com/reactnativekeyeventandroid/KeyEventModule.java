package com.reactnativekeyeventandroid;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;

@ReactModule(name = KeyEventModule.NAME)
public class KeyEventModule extends ReactContextBaseJavaModule {
  public static final String NAME = "KeyEventModule";

  private DeviceEventManagerModule.RCTDeviceEventEmitter mJSModule = null;

  private static KeyEventModule instance = null;

  public KeyEventModule(ReactApplicationContext context) {
    this.instance = new KeyEventModule(context);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

}
