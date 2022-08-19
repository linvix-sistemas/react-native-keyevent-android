package com.reactnativekeyeventandroid;

import android.view.KeyEvent;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;


@ReactModule(name = KeyEventModule.NAME)
public class KeyEventModule extends ReactContextBaseJavaModule {
  public static final String NAME = "KeyEventModule";

  public ReactApplicationContext context;

  private DeviceEventManagerModule.RCTDeviceEventEmitter mJSModule = null;

  private static KeyEventModule instance = null;

  public KeyEventModule(ReactApplicationContext context) {
    super(context);
    this.context = context;
  }

  public void onKeyDownEvent(int keyCode, KeyEvent keyEvent) {
    if (!this.context.hasActiveReactInstance()) {
      return;
    }

    SendEvent("onKeyDown", ConfigureJSResponse(keyCode, keyEvent, null));
  }

  public void onKeyUpEvent(int keyCode, KeyEvent keyEvent) {
    if (!this.context.hasActiveReactInstance()) {
      return;
    }

    SendEvent("onKeyUp", ConfigureJSResponse(keyCode, keyEvent, null));
  }

  public void onKeyMultipleEvent(int keyCode, int repeatCount, KeyEvent keyEvent) {
    if (!this.context.hasActiveReactInstance()) {
      return;
    }

    SendEvent("onKeyMultiple", ConfigureJSResponse(keyCode, keyEvent, repeatCount));
  }

  /**
   * Configura a resposta para o js.
   *
   * @param keyCode
   * @param keyEvent
   * @param repeatCount
   * @return
   */
  private WritableMap ConfigureJSResponse(int keyCode, KeyEvent keyEvent, Integer repeatCount) {
    WritableMap params = new WritableNativeMap();
    int action = keyEvent.getAction();
    char pressedKey = (char) keyEvent.getUnicodeChar();

    // localiza as multi teclas pressionadas e monta a array de teclas
    if (keyEvent.getAction() == KeyEvent.ACTION_MULTIPLE && keyCode == KeyEvent.KEYCODE_UNKNOWN) {
      String chars = keyEvent.getCharacters();
      if (chars != null) {
        params.putString("characters", chars);
      }
    }

    // verifica a quantidade de vezes pressionada
    if (repeatCount != null) {
      params.putInt("repeatcount", repeatCount);
    }

    params.putInt("keyCode", keyCode);
    params.putInt("action", action);
    params.putString("pressedKey", String.valueOf(pressedKey));

    return params;
  }


  /**
   * Envia o evento para o javascript.
   *
   * @param eventName
   * @param params
   */
  private void SendEvent(
    String eventName,
    WritableMap params
  ) {
    context
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, params);
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

}
