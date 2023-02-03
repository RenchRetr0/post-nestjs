import { Body, Controller, Post, Get, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/LoginUser.dto';
import { UserResponseDto } from './dto/UserResponse.dto';
import { JWTAuthGuard } from './jwt-auth.guard';

@ApiTags('users')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    @ApiOkResponse({
        description: 'User is authorized',
        type: UserResponseDto
    })
    @ApiUnauthorizedResponse({ description: 'User unauthorized'})
    async login(@Body() loginUserDto: LoginUserDto): Promise<UserResponseDto> {
        return await this.authService.validateUserCreds(loginUserDto);
    }

    @ApiBearerAuth()
    @UseGuards(JWTAuthGuard)
    @Get('user')
    async user(@Request() req): Promise<any> {
        return req.user;
    }
}
