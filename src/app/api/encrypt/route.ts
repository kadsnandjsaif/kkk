import { NextRequest, NextResponse } from 'next/server';
import CryptoJS from 'crypto-js';

const ENCRYPTION_KEY = process.env.ENCRYPTION_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json();
    
    const iv = CryptoJS.lib.WordArray.random(16);
    const encrypted = CryptoJS.AES.encrypt(data, ENCRYPTION_KEY, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    
    return NextResponse.json({
      encryptedData: encrypted.toString(),
      iv: iv.toString(CryptoJS.enc.Hex)
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Encryption failed' },
      { status: 500 }
    );
  }
}