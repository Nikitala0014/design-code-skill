export class ChallengeDto {
    readonly _id: string;
    readonly chapterId: string;
    readonly title: string;
    readonly details: {
        readonly difficulty: string;
        readonly skill: string;
        readonly maxScore: string;
        readonly successRatio: string;
    }
    readonly preview: string;
    readonly content: {
        readonly contentProblem: string;
        readonly contentCode: string;
    }
}

export class ChallengeDetailsDto {
    readonly _id: string;
    readonly difficulty: string;
    readonly skill: string;
    readonly maxScore: string;
    readonly successRatio: string;
}

export class ChallengeContentProblemDto {
    readonly _id: string;
    readonly contentProblem: string;
}

export class ChallengeContentCodeDto {
    readonly _id: string;
    readonly contentCode: string;
}