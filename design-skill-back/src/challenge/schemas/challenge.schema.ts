import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChallengeDocument = Challenge & Document;

class ContentSubmissionDetailsData {
    @Prop(raw({
        status: { type: String },
        input: { type: String },
        result: { type: String },
        expected: { type: Number },
    }))
    case_result_0: {status: string, input: string, result: string, expected: number};

    @Prop(raw({
        status: { type: String },
        input: { type: String },
        result: { type: String },
        expected: { type: Number },
    }))
    case_result_1: {status: string, input: string, result: string, expected: number};

    @Prop(raw({
        status: { type: String },
        input: { type: String },
        result: { type: String },
        expected: { type: Number },
    }))
    case_result_2: {status: string, input: string, result: string, expected: number};
}

class ContentSubmissionDetails {
    @Prop()
    submitedCode: string;

    @Prop(ContentSubmissionDetailsData)
    submissionData: ContentSubmissionDetailsData;
}

class ContentSubmission {
    @Prop()
    challengeId: string;

    @Prop()
    userId: string;

    @Prop()
    status: string;

    @Prop()
    score: number;
    
    @Prop()
    date: number;

    @Prop()
    submitedCodeId: string;

    @Prop(ContentSubmissionDetails)
    submissionDetails: ContentSubmissionDetails;
}

class Details {
    @Prop()
    difficulty: string;
    
    @Prop()
    skill: string;

    @Prop()
    maxScore: number;

    @Prop()
    successRatio: string;
}

class Cases {
    @Prop(raw({
        input: { type: String },
        expectedOutput: { type: Number }
    }))
    case_0: {input: string, expectedOutput: string};

    @Prop(raw({
        input: { type: String },
        expectedOutput: { type: Number }
    }))
    case_1: {input: string, expectedOutput: string};

    @Prop(raw({
        input: { type: String },
        expectedOutput: { type: Number }
    }))
    case_2: {input: string, expectedOutput: string};
}

class ContentCode {
    @Prop()
    code: string;

    @Prop(Cases)
    cases: Cases;
}

class Content {
    @Prop()
    contentProblem: string;

    @Prop(ContentCode)
    contentCode: ContentCode;

    @Prop()
    contentEditorial: string;
}

@Schema()
export class Challenge {
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

    @Prop(ContentSubmission)
    challengeCodeSubmissions?: ContentSubmission[];
}

export const ChallengeSchema = SchemaFactory.createForClass(Challenge);