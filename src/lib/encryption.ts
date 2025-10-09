// lib/encryption.ts
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.ENCRYPTION_SECRET!;

export function encryptData(data: string) {
  if (!ENCRYPTION_KEY) {
    throw new Error('Encryption key is not available');
  }

  try {
    const iv = CryptoJS.lib.WordArray.random(16);
    
    const encrypted = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return {
      encryptedData: encrypted.toString(),
      iv: iv.toString(CryptoJS.enc.Hex)
    };
  } catch (error) {
    // Правильная обработка ошибки типа 'unknown'
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to encrypt data: ${errorMessage}`);
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
  } catch {
    // Убрали неиспользуемую переменную _error
    throw new Error('Failed to decrypt data');
  }
}