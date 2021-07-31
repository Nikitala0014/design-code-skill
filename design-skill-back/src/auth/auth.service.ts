import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { IUserChallenge } from './interfaces/user-challenge.interface';
import { IUser } from './interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.interface';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
    constructor (
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
    ) {}

    async createAnAccount (
        { _username, _password, _role }: UserDto,
    ): Promise<{accessToken: string, user: {_id: string, role: string, username: string}}> {
        const saltOrRounds = 10;
        const passwordHash = await bcrypt.hash(_password, saltOrRounds);
        const userInDb = await this.userModel.findOne({username: _username});

        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const createdUser = await new this.userModel(
            {username: _username, password: passwordHash, role: _role}
        ).save();
        const {_id, username, role} = createdUser;
        const token = this._createToken({_id, role, username})
        return { accessToken: token, user: {_id, username, role} };
    }

    async logInAccount(
        { _username, _password }: UserDto
    ): Promise<{accessToken: string, user: {_id: string, role: string, username: string}}> {
        const user = await this.userModel.findOne({username: _username})
        
        const isMatch = await bcrypt.compare(_password, (user ? user.password : ''));
        
        if (user && isMatch) {
            const {_id, username, role} = user;
            const token = this._createToken({_id, role, username});
            return { accessToken: token, user: {_id, username, role} };
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Username or password incorrect'
            }, HttpStatus.FORBIDDEN);
        }
    }

    private _createToken ({_id, username, role}: IUser): any {
        const user: JwtPayload = {_id, username, role};
        const accessToken = this.jwtService.sign(user);
        return accessToken;
    }

    async validateUser (payload: JwtPayload): Promise<any> {
        const user = await this.userModel.findOne({username: payload.username})
        if (!user) {
            throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userData } = user;
        return userData;
    }

    async fetchUserChallenges (
        userId: string): Promise<{
            challengesAttempted: IUserChallenge[], 
            challengesSolved: IUserChallenge[]
    }> {
        const user = await this.userModel.findById(userId);
        const { challengesAttempted, challengesSolved } = user
        return { challengesAttempted, challengesSolved }
    }
    
    async addAttemtedChallenge (
        payload: {
            userChallenge: IUserChallenge, 
            userId: string
        }
    ): Promise<void> {
        console.log('work attempted')

        const { userChallenge, userId } = payload;
        await this.userModel.findByIdAndUpdate(
            userId, {$push: { 'challengesAttempted': userChallenge }}
        )
    }

    async addSolvedChallenge (
        payload: {
            userChallenge: IUserChallenge, 
            userId: string
        }
    ): Promise<void> {
        const { userChallenge, userId } = payload;
        await this.userModel.findByIdAndUpdate(
            userId, {$push: { 'challengesSolved': userChallenge }}
        )
    }
}
