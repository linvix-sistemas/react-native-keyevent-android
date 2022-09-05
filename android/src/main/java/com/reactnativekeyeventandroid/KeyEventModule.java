package com.reactnativekeyeventandroid;

import android.view.KeyEvent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;


@ReactModule(name = KeyEventModule.NAME)
public class KeyEventModule extends ReactContextBaseJavaModule {
  public static final String NAME = "KeyEventModule";

  private static KeyEventModule instance = null;

  public ReactApplicationContext context;

  public static KeyEventModule InitModule(ReactApplicationContext reactContext) {
    instance = new KeyEventModule(reactContext);
    return instance;
  }

  public KeyEventModule(ReactApplicationContext context) {
    super(context);
    this.context = context;
  }

  public static KeyEventModule getInstance() {
    return instance;
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

  public void onDispatchKeyEvent(KeyEvent keyEvent) {
    if (!this.context.hasActiveReactInstance()) {
      return;
    }
    SendEvent("onDispatchKey", ConfigureJSResponse(keyEvent.getKeyCode(), keyEvent, null));
  }

  /**
   * Configura a resposta para o js.
   */
  private WritableMap ConfigureJSResponse(int keyCode, KeyEvent keyEvent, Integer repeatCount) {
    WritableMap params = new WritableNativeMap();
    int action = keyEvent.getAction();
    char pressedKey = (char) keyEvent.getUnicodeChar();

    // verifica se o enter foi pressionado
    boolean enterPressed = keyCode == KeyEvent.KEYCODE_ENTER || keyCode == KeyEvent.KEYCODE_NUMPAD_ENTER;

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
    params.putBoolean("enterPressed", enterPressed);

    return params;
  }

  /**
   * Envia o evento para o javascript.
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
