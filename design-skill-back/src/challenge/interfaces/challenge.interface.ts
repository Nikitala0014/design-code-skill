import { ObjectId } from "mongoose";

export interface IChallenge {
    readonly _id: ObjectId;
    readonly chapterId: ObjectId;
    readonly title: string;
    readonly status: string;
    readonly details: {
        readonly difficulty: string;
        readonly skill: string;
        readonly maxScore: string;
        readonly successRatio: string;
    }
    readonly preview: string;
    readonly content: IChallengeContent;
}

export interface IChallengeContent {
    readonly contentProblem: string;
    readonly contentCode: string;
}