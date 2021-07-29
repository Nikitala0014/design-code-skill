export interface IChallenge {
    _id?: string;
    chapterId: string;
    title: string;
    status: string;
    details: IChallengeDetails;
    preview: string;
    content: {
        contentEditorial: string;
        contentProblem: string,
        contentCode: IContentCode,
    };
    challengeCodeSubmissions?: IContentSubmission[];
}

export interface IContentCode {
    code: string;
    cases: {
        case_0: {input: string, expectedOutput: string},
        case_1: {input: string, expectedOutput: string},
        case_2: {input: string, expectedOutput: string},
    }
}

export interface IChallengeCard {
    _id: string;
    title: string;
    status: string;
    details: IChallengeDetails;
    preview: string;
}

export interface IChallengeDetails {
    difficulty: string;
    skill: string;
    maxScore: string;
    successRatio: string;
}

export interface IContentSubmission {
    challengeId: string;
    userId: string;
    status: string;
    score: number;
    date: number;
    submitedCodeId: string;
    submissionDetails: ISubmissionDetails
}

export interface ISubmissionData {
    case_result_0: {status: string, input: string, result: string, expected: number},
    case_result_1: {status: string, input: string, result: string, expected: number},
    case_result_2: {status: string, input: string, result: string, expected: number},
}

export interface ISubmissionDetails {
    submitedCode: string;
    submissionData?: ISubmissionData;
}