import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UtilsService {
  constructor(private configService: ConfigService) {}

  getEncryptionKey() {
    const encryptionKey = this.configService.get<string>('ENCRYPTION_KEY');
  }
}
