import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EncryptionService } from './utils/encryption.service';
import configuration from './common/env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configuration: ConfigService) => ({
        uri: configuration.get<string>('DATABASE_URL')
      }),
      inject: [ConfigService]
    }),
    UsersModule,
    ProjectModule,
    TaskModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, EncryptionService],
})
export class AppModule { }
