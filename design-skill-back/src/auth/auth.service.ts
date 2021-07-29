import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

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
        const token = this._createToken(createdUser)
        const {_id, username, role} = createdUser
        return { accessToken: token, user: {_id, username, role} };
    }

    async logInAccount(
        { _username, _password }: UserDto
    ): Promise<{accessToken: string, user: {_id: string, role: string, username: string}}> {
        const user = await this.userModel.findOne({username: _username})
        const isMatch = await bcrypt.compare(_password, (user ? user.password : ''));
        console.log('user', user);
        console.log('is match', isMatch);
        
        
        if (user && isMatch) {
            const token = this._createToken(user);
            const {_id, username, role} = user;
            return { accessToken: token, user: {_id, username, role} };
        } else {
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: 'Username or password incorrect'
            }, HttpStatus.FORBIDDEN);
        }
    }

    private _createToken ({username}: User): any {
        const user: JwtPayload = {username};
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
}
