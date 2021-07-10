import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from './schemas/user.schema';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post('register')
    async newUser (@Body() userDto: UserDto): Promise<User> {
        return await this.authService.newUser(userDto);
    }

    @Post('login')
    async login (@Body() userDto: UserDto): Promise<any> {
        return await this.authService.login(userDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('isLogin')
    async isLogin() {
        return true;
    }
}
