import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { process } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { User, UserSchema } from './schemas/user.schema';

@Module({
    imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    PassportModule.register({
        defaultStrategy: 'jwt',
        property: 'user',
        session: true
    }), JwtModule.register({
        secret: process.secretKey,
        signOptions: { expiresIn: process.expiresIn },
    })],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule, JwtModule],
})
export class AuthModule {}
