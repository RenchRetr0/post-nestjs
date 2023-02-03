import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { IUser } from '../user/interface/user.interface';
import { UserService } from '../user/user.service';
import { LoginUserDto } from './dto/LoginUser.dto';
import { UserResponseDto } from './dto/UserResponse.dto';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}
    
    async validateUserCreds(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
        const email = loginUserDto.email;
        const user = await this.userService.findOne({email});
        if(!user) throw new BadRequestException();

        if(!(await bcrypt.compare(loginUserDto.password, user.password))) {
            throw new UnauthorizedException();
        }

        const access_token = await this.generateToken(user);

        return {
            login: user.login,
            email: user.email,
            access_token
        }
    }

    async generateToken(user: IUser): Promise<string> {
        const access_token = this.jwtService.sign({
                password: user.password,
                id: user._id,
            });
        return access_token;
    }
}
