import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
    challengesBookmarked?: string[];

    @Prop()
    challengesSolved?: string[];

    @Prop()
    challengesAttempted?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);