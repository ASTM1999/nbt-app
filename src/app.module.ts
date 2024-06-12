import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { EncryptionService } from './utils/encryption.service';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      }),
      MongooseModule.forRoot("mongodb+srv://anusornsriprom44:AMgxxhOKIHmlXUua@cluster0.bmiggf1.mongodb.net/toolkithub"),
    UsersModule,
    ProjectModule,
    TaskModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService, EncryptionService],
})
export class AppModule { }
