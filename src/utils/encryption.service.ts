import * as CryptoJS from 'crypto-js';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptionService {
  private ENCRYPTION_KEY: string;

  constructor(private configService: ConfigService) {
    this.ENCRYPTION_KEY = this.configService.get<string>('ENCRYPTION_KEY');
    // console.log('ENCRYPTION_KEY:', this.ENCRYPTION_KEY);
  }

  private IV_LENGTH = 16;

  encryptData(data: string): string {
    const iv = CryptoJS.lib.WordArray.random(this.IV_LENGTH);
    const encrypted = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(this.ENCRYPTION_KEY), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.toString();
  }

  decryptData(data: string): string {
    const parts = data.split(':');
    const iv = CryptoJS.enc.Hex.parse(parts[0]);
    const encryptedData = parts[1];
    const decrypted = CryptoJS.AES.decrypt(encryptedData, CryptoJS.enc.Utf8.parse(this.ENCRYPTION_KEY), {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
