export interface IChallenge {
    readonly chapterId: string;
    readonly title: string;
    readonly status: string;
    readonly details: IChallengeDetails;
    readonly preview: string;
    readonly content: IChallengeContent;
    readonly challengeCodeSubmissions?: IContentSubmission[];
}

export interface IChallengeDetails {
    readonly difficulty: string;
    readonly skill: string;
    readonly maxScore: number;
    readonly successRatio: string;
}

export interface IChallengeContent {
    readonly contentProblem: string;
    readonly contentCode: IContentCode;
    readonly contentEditorial: string;
}

export interface IContentCode {
    code: string;
    cases: {
        case_0: {input: string, expectedOutput: string},
        case_1: {input: string, expectedOutput: string},
        case_2: {input: string, expectedOutput: string},
    }
}

export interface IContentSubmission {
    readonly challengeId: string;
    readonly userId: string;
    readonly status: string;
    readonly score: number;
    readonly date: number;
    readonly submitedCodeId: string;
    readonly submissionDetails: {
        readonly submitedCode: string;
        readonly submissionData: {
            case_result_0: {status: string, input: string, result: string, expected: number},
            case_result_1: {status: string, input: string, result: string, expected: number},
            case_result_2: {status: string, input: string, result: string, expected: number},
        }
    }
}

export interface IResultOfSubmission {
    challengeId: string;
    userId: string;
    score: number,
    cases: {
        case_result_0: {status: string, result: string, expected: number},
        case_result_1: {status: string, result: string, expected: number},
        case_result_2: {status: string, result: string, expected: number},
    };
    submitedCode: string;
}