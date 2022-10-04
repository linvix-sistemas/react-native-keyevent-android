# @linvix-sistemas/react-native-keyevent-android
Pacote para detectar as teclas pressionadas no teclado no android.

---

## Instalação

```sh
npm install @linvix-sistemas/react-native-keyevent-android
```

```sh
yarn add @linvix-sistemas/react-native-keyevent-android
```
# Configuração
Adicione/mescle as seguintes linhas no arquivo: MainActivity.java

```java
// adicione as linha nos imports
import android.view.KeyEvent;
import com.reactnativekeyeventandroid.KeyEventModule;

public class MainActivity extends ReactActivity {

      // A. Impedir vários eventos ao pressionar o botão por muito tempo
      //        if (event.getRepeatCount() == 0) {
      //            KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
      //        }
      //
      // B. Se vários eventos devem ser disparados quando o botão é pressionado e mantido.
      //        KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
      @Override
      public boolean onKeyDown(int keyCode, KeyEvent event) {
        KeyEventModule.getInstance().onKeyDownEvent(keyCode, event);
        return super.onKeyDown(keyCode, event);
      }

      @Override
      public boolean onKeyUp(int keyCode, KeyEvent event) {
        KeyEventModule.getInstance().onKeyUpEvent(keyCode, event);
        return super.onKeyUp(keyCode, event);
      }

      @Override
      public boolean onKeyMultiple(int keyCode, int repeatCount, KeyEvent event) {
          KeyEventModule.getInstance().onKeyMultipleEvent(keyCode, repeatCount, event);
          return super.onKeyMultiple(keyCode, repeatCount, event);
      }

      @Override
      public boolean dispatchKeyEvent(KeyEvent event) {
          KeyEventModule.getInstance().onDispatchKeyEvent(event);
          return super.dispatchKeyEvent(event);
      }
      ......

    }
```

## Uso

```js
import KeyEventAndroid from '@linvix-sistemas/react-native-keyevent-android';

useEffect(()=> {
    const CleanListenerKeyDown = KeyEventAndroid.onKeyDownListener((ev) => {
      console.log(`KeyCode: ${ev.keyCode}`);
      console.log(`Action: ${ev.action}`);
      console.log(`Key: ${ev.pressedKey}`);
      console.log(`Enter?: ${ev.enterPressed}`);
    });

    // if you want to react to keyUp
    const CleanListenerKeyUp = KeyEventAndroid.onKeyUpListener((ev) => {
      console.log(`KeyCode: ${ev.keyCode}`);
      console.log(`Action: ${ev.action}`);
      console.log(`Key: ${ev.pressedKey}`);
      console.log(`Enter?: ${ev.enterPressed}`);
    });

    // if you want to react to keyMultiple
    const CleanListenerKeyMultiple = KeyEventAndroid.onKeyMultipleListener((ev) => {
      console.log(`KeyCode: ${ev.keyCode}`);
      console.log(`Action: ${ev.action}`);
      console.log(`Characters: ${ev.characters}`);
    });

    // if you want to react to keyMultiple
    const CleanListenerDispatchKey = KeyEventAndroid.onDispatchKeyListener((ev) => {
      console.log(`KeyCode: ${ev.keyCode}`);
      console.log(`Action: ${ev.action}`);
      console.log(`Characters: ${ev.characters}`);
    });

    // remove os listeners
    return ()=> {
        CleanListenerKeyDown();
        CleanListenerKeyUp();
        CleanListenerKeyMultiple();
        CleanListenerDispatchKey();
    }
}, []);
```

## Contribuindo
Fique a vontade para fazer contribuições no projeto, ele é um projeto que a Linvix Sistemas está utilizando em seus projetos e achou conveniente disponibilizar para a comunidade.

## License

MIT
