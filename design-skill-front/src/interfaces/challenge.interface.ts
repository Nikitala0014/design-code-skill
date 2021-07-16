export interface IChallenge {
    _id?: string;
    chapter?: {chapterId: string, chapterName: string};
    title: string;
    status: string;
    details: IChallengeDetails;
    preview: string;
    content: {
        contentSubmissions?: ISubmitedCode[];
        contentEditorial?: string;
        contentProblem: string,
        contentCode: string,
    };
    route?: string;
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

export interface ISubmissionsBody {
    
}

export interface ISubmitedCode {
    status: string;
    score: number;
    time: string;
    submitedCodeId: string;
    details?: ISubmissionDetails[]
}

export interface ISubmissionData {
    status: string;
    input: number[];
    userOutput: string;
    expectedOutput: string;
}

export interface ISubmissionDetails {
    time: string;
    score: string;
    status: string;
    submitedCodeId: string;
    submitedCode: string;
    submissionData?: ISubmissionData[];
}