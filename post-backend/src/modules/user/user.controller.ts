import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from './dto/CreateUser.dto';
import { IUser } from './interface/user.interface';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('create')
    async createUser(@Body() createUser: CreateUserDto): Promise<IUser> {
        return await this.userService.createUser(createUser);
    }
}
