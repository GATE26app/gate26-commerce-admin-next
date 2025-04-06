
import cryptoJs from 'crypto-js'

const key = btoa('IDT-ReGate26');

export const crypto: any = {
  encrypt: (string: any | undefined) => {
    var aes128Iv = '0123456789abcdef';

    return string === undefined ? '' :cryptoJs.AES?.encrypt(string, cryptoJs.enc.Utf8.parse(key), {
      iv: cryptoJs.enc.Utf8.parse(aes128Iv),
    }).toString();
  },

  decrypt: (encStr: any | undefined) => {
    var aes128Iv = '0123456789abcdef';
    return encStr === undefined ? '' : cryptoJs.AES?.decrypt(encStr, cryptoJs.enc.Utf8.parse(key), {
      iv: cryptoJs.enc.Utf8.parse(aes128Iv),
    }).toString(cryptoJs.enc.Utf8);
  },
};

export const safeDecryptAndParse = (data :any) => {
  try {
    if (!data) return null;
 
    const decrypted = crypto.decrypt(data);
 
    // 숫자인지 체크 (정수 + 소수)
    if (!isNaN(decrypted)) {
      return Number(decrypted);
    }
 
    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const safeEncrypt = (value :any) => {
  if (value && value !== '') {
    return crypto.encrypt(JSON.stringify(value));
  }
  return value;
};