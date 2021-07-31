export class CreateChallengeDto {
    readonly chapterId: string;
    readonly chapterName: string;
    readonly title: string;
    readonly status: string;
    readonly details: {
        readonly difficulty: string;
        readonly skill: string;
        readonly maxScore: number;
        readonly successRatio: string;
    }
    readonly preview: string;
    readonly content: CreateChallengeContentDto;
    readonly contentCodeSubmissions: ContentSubmissionDto[]
}

export class CreateChallengeContentDto {
    readonly contentProblem: string;
    readonly contentCode: CreateChallengeContentCodeDto;
    readonly contentEditorial: string
}

export class CreateChallengeContentCodeDto {
    readonly code: string;
    readonly cases: {
        case_0: {input: string, expectedOuput: number},
        case_1: {input: string, expectedOuput: number},
        case_2: {input: string, expectedOuput: number},
    };
}

export class ContentSubmissionDto {
    readonly challengeId: string;
    readonly userId: string;
    readonly status: string;
    readonly score: number;
    readonly date: string;
    readonly submitedCodeId: string;
    readonly submissionDetails: {
        readonly submitedCode: string;
        readonly submissionData: {
            case_result_0: {status: string, result: string, expected: number},
            case_result_1: {status: string, result: string, expected: number},
            case_result_2: {status: string, result: string, expected: number},
        }
    }
}