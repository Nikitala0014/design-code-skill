export class CreateChallengeDto {
    readonly chapterId: string;
    readonly title: string;
    readonly status: string;
    readonly details: {
        readonly difficulty: string;
        readonly skill: string;
        readonly maxScore: string;
        readonly successRatio: string;
    }
    readonly preview: string;
    readonly content: CreateChallengeContentDto;
}

export class CreateChallengeContentDto {
    readonly problem: string;
    readonly code: string;
}