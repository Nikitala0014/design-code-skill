import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChallengeDocument = Challenge & Document;

class Details {
    @Prop()
    difficulty: string;
    
    @Prop()
    skill: string;

    @Prop()
    maxScore: string;

    @Prop()
    successRatio: string;
}

class Content {
    @Prop()
    contentProblem: string;

    @Prop()
    contentCode: string;
}

@Schema()
export class Challenge {
    @Prop()
    _id: string;

    @Prop()
    chapterId: string;

    @Prop()
    title: string;

    @Prop()
    status: string;

    @Prop(Details)
    details: Details;

    @Prop()
    preview: string;

    @Prop(Content)
    content: Content;
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);