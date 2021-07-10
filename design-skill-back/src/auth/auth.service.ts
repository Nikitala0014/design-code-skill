import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.interface';
import { UserDto } from './dto/user.dto';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor (
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
    ) {}

    async newUser ({ username, password }: UserDto): Promise<User> {
        const saltOrRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltOrRounds);
        const userInDb = await this.userModel.findOne({username});

        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const createdUser = new this.userModel({username, password: passwordHash});
        return createdUser.save();
    }

    async login({ username, password }: UserDto): Promise<any> {
        const user = await this.userModel.findOne({username})
        const isMatch = await bcrypt.compare(password, user.password);

        if (user && isMatch) {
            const token = this._createToken(user);
            return { accessToken: token }
        } else {
            throw new Error('Username or password incorrect');
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
