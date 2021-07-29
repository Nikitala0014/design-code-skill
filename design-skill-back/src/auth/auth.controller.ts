import { 
    Controller, 
    Body, Post, Get, 
    UseGuards, 
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post('createAnAccount')
    async createAnAccount (
        @Body() userDto: UserDto
    ): Promise<{accessToken: string, user: {_id: string, role: string, username: string}}> {
        return await this.authService.createAnAccount(userDto);
    }

    @Post('logInAccount')
    async logInAccount (
        @Body() userDto: UserDto
    ): Promise<{accessToken: string, user: {_id: string, role: string, username: string}}> {
        try {
            return await this.authService.logInAccount(userDto);
        } catch (error) {
            throw new HttpException({
                    status: HttpStatus.FORBIDDEN, 
                    message: 'Username or password incorrect'
                }, HttpStatus.FORBIDDEN)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('isLogin')
    async isLogin() {
        return true;
    }
}
