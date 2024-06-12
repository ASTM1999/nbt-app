import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.interface';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    getHelloUser(): string {
        return this.usersService.getHelloUser();
    }

    @Get('/all')
    async getAllUser(): Promise<any[]> {
        return await this.usersService.getAllUser()
    }
}
