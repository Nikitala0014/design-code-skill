import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { IUserChallenge } from '../interfaces/user-challenge.interface';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    role: string;

    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop()
    challengesBookmarked?: IUserChallenge[];

    @Prop()
    challengesSolved?: IUserChallenge[];

    @Prop()
    challengesAttempted?: IUserChallenge[];
}

export const UserSchema = SchemaFactory.createForClass(User);