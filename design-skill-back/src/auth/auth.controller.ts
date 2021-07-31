import { 
    Controller, 
    Body, Post, Get, Headers,
    UseGuards, 
    HttpException,
    HttpStatus,
    Param,
} from '@nestjs/common';
import jwt_decode from 'jwt-decode';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IUser } from './interfaces/user.interface';
import { IUserChallenge } from './interfaces/user-challenge.interface';

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
    async isLogin(@Headers() headers): Promise<IUser> {
        const token = headers.authorization.replace('Bearer ', '')
        const decoded = jwt_decode(token);
        const {_id, role, username} = decoded as IUser;
        
        return {_id, role, username};
    }

    @UseGuards(JwtAuthGuard)
    @Get('fetchUserChallenges/:_id')
    async fetchUserChallenges(
        @Param('_id') userId: string): Promise<{
            challengesAttempted: IUserChallenge[], 
            challengesSolved: IUserChallenge[]
    }> {
        return this.authService.fetchUserChallenges(userId)
    }
}
