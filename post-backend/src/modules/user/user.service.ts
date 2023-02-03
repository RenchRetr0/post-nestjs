import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel} from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/CreateUser.dto';
import { IUser } from './interface/user.interface';
import { User } from './schemas/user.schema';
import { UserRole } from './enums/user.enum';

@Injectable()
export class UserService {
    constructor (@InjectModel('User') private readonly userModel: Model<IUser>) {}

    async createUser(createUser: CreateUserDto): Promise<IUser> {
        const result = await this.userExists(createUser.login, createUser.email);

        const role = await this.roleForFirstUser();

        const newUser = new this.userModel({
            login: createUser.login,
            email: createUser.email,
            role: role,
            password: await this.generatePassword_hash(createUser.password)
        });
        return newUser.save();
    }

    async findOneId(id: string): Promise<IUser> {
        return this.userModel.findById(id);
    }

    async findOne(userFilterQuery: FilterQuery<User>): Promise<IUser> {
        return await this.userModel.findOne(userFilterQuery);
    }

    async getAll(): Promise<IUser[]> {
        return this.userModel.find();
    }

    async generatePassword_hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    async userExists(login: string, email): Promise<boolean> {
        if( await this.findOne({login})) {
            throw new HttpException('Login busy.', HttpStatus.UNAUTHORIZED);
        }

        if( await this.findOne({email})) {
            throw new HttpException('Email busy.', HttpStatus.UNAUTHORIZED);
        }

        return false;
    }

    async roleForFirstUser(): Promise<string> {
        const users = await this.getAll();

        if(!users || !users[0]) {
            return UserRole.ADMIN;
        }

        return UserRole.USER;
    }
}
