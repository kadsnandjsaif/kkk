// lib/encryption.ts
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.ENCRYPTION_SECRET!;


// Проверка на сервере
if (typeof window === 'undefined' && !ENCRYPTION_KEY) {
  throw new Error('❌ ENCRYPTION_SECRET is not defined in environment variables');
}

export function encryptData(data: string) {

  
  try {
    if (!data) {
      throw new Error('Data is empty');
    }
    
    if (!ENCRYPTION_KEY) {
      throw new Error('Encryption key is not defined');
    }



    // Генерируем случайный вектор инициализации
    const iv = CryptoJS.lib.WordArray.random(16);

    console.log('Encrypting data...');
    // Шифруем данные
    const encrypted = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    
    const result = {
      encryptedData: encrypted.toString(),
      iv: iv.toString(CryptoJS.enc.Hex)
    };

    console.log('✅ Encryption successful');
    console.log('Encrypted data length:', result.encryptedData.length);
    console.log('IV:', result.iv);

    return result;
  } catch (error) {
   
    throw new Error(`Failed to encrypt data: ${error.message}`);
  }
}

export function decryptData(encryptedData: string, iv: string) {
  
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY, {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const result = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!result) {
      throw new Error('Decryption failed - empty result');
    }

    return result;
  } catch (error) {
    throw new Error('Failed to decrypt data');
  }
}