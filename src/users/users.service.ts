import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';



@Injectable()
export class UsersService {

    constructor(
        @InjectModel('users')
        private readonly usersModel: Model<any>,
    ) { }

    async getAllUser() {
        return await this.usersModel.find({}).sort({ score: 'desc' }).exec();
    }

    getHelloUser(): string {
        return 'Hello user test';
    }
}
