// lib/encryption.ts
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.ENCRYPTION_SECRET!;

export function encryptData(data: string) {
  console.log('🔐 Starting encryption...');
  
  if (!ENCRYPTION_KEY) {
    throw new Error('Encryption key is not available');
  }

  try {
    // Генерируем случайный вектор инициализации
    const iv = CryptoJS.lib.WordArray.random(16);
    
    // Шифруем данные
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
    console.error('❌ Encryption failed:', error);
    // Фиксим ошибку TypeScript с типом 'unknown'
    const errorMessage = error instanceof Error ? error.message : 'Unknown encryption error';
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
  } catch (_error) {
    // Используем _error чтобы показать что переменная намеренно не используется
    throw new Error('Failed to decrypt data');
  }
}