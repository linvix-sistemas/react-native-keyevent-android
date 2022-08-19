import { NativeModules } from 'react-native';

import type { ImprimirQRCodeType } from './types/tectoysunmi-types';

const { Keyevent-android } = NativeModules;

/**
 * Obtém o status da impressora
 */
const ObterStatus = async () => {
  try {
    const status = await Keyevent-android.getStatus();
    return JSON.parse(status);
  } catch (error) {
    throw error;
  }
};

const ImprimirTexto = (texto = '') => {
  try {
    Keyevent-android.printText(texto);
  } catch (error) {
    throw error;
  }
};

const AvancarLinha = (linhas = 0) => {
  try {
    Keyevent-android.feedAdvancesLines(linhas);
  } catch (error) {
    throw error;
  }
};

const Avancar3Linhas = () => {
  try {
    Keyevent-android.feed3lines();
  } catch (error) {
    throw error;
  }
};

const CortarPapel = () => {
  try {
    Keyevent-android.cutpaper();
  } catch (error) {
    throw error;
  }
};

const ImprimirQRCode = (data: ImprimirQRCodeType) => {
  try {
    Keyevent-android.printQr(data.data, data.size, data.error);
  } catch (error) {
    throw error;
  }
};

const NativeModuleTectToySunmiPrinterSDK = {
  ObterStatus,
  ImprimirTexto,
  ImprimirQRCode,
  CortarPapel,
  AvancarLinha,
  Avancar3Linhas,
};

export default NativeModuleTectToySunmiPrinterSDK;
