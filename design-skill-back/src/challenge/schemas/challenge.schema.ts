import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type ChallengeDocument = Challenge & Document;

@Schema()
export class Challenge {
    @Prop()
    _id: ObjectId;

    @Prop()
    chapterId: ObjectId;

    @Prop()
    title: string;

    @Prop()
    status: string;

    @Prop()
    details: {
        difficulty: string;
        skill: string;
        maxScore: string;
        successRatio: string;
    }

    @Prop()
    preview: string;

    @Prop()
    content: {
        contentProblem: string;
        contentCode: string;
    };
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);