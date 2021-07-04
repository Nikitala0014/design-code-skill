export interface IChallenge {
    readonly _id: string;
    readonly chapterId: string;
    readonly title: string;
    readonly status: string;
    readonly details: IChallengeDetails;
    readonly preview: string;
    readonly content: IChallengeContent;
}

export interface IChallengeDetails {
    readonly difficulty: string;
    readonly skill: string;
    readonly maxScore: string;
    readonly successRatio: string;
}

export interface IChallengeContent {
    readonly contentProblem: string;
    readonly contentCode: string;
}