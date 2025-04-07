import cryptoJs from 'crypto-js';

const key = btoa('IDT-ReGate26');

export const crypto: any = {
  encrypt: (string: any | undefined) => {
    var aes128Iv = '0123456789abcdef';

    return string === undefined
      ? ''
      : cryptoJs.AES?.encrypt(string, cryptoJs.enc.Utf8.parse(key), {
          iv: cryptoJs.enc.Utf8.parse(aes128Iv),
        }).toString();
  },

  decrypt: (encStr: any | undefined) => {
    var aes128Iv = '0123456789abcdef';
    return encStr === undefined
      ? ''
      : cryptoJs.AES?.decrypt(encStr, cryptoJs.enc.Utf8.parse(key), {
          iv: cryptoJs.enc.Utf8.parse(aes128Iv),
        }).toString(cryptoJs.enc.Utf8);
  },
};

export const safeDecryptAndParse = (data: any) => {
  try {
    if (!data) return null;

    const decrypted = crypto.decrypt(data);

    // 복호화된 값이 쌍따옴표로 감싸져 있으면 JSON.parse 시도
    if (typeof decrypted === 'string' && /^".*"$/.test(decrypted.trim())) {
      return JSON.parse(decrypted);
    }

    return decrypted;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const safeEncrypt = (value: any) => {
  if (value && value !== '') {
    return crypto.encrypt(value);
  }
  return value;
};
