import { IChallenge } from '../interfaces/challenge.interface';

export class ChallengeDto {
    readonly _id: string;
    readonly chapterId: string;
    readonly chapterName: string;
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
        readonly contentCode: ChallengeContentCodeDto;
        readonly contentEditorial: string;
    }
    readonly challengeCodeSubmissions: {
        readonly userIdCompetitor: string;
        readonly submissions: ChallengeCodeSubmissionDto[];
    }[]
}

export class ChallengeContentCodeDto {
    contentCode: IChallenge["content"]["contentCode"]
}
export class ChallengeContentProblemDto {
    contentProblem: IChallenge["content"]["contentProblem"];
}
export class ChallengeContentEditorialDto {
    contentEditorial: IChallenge["content"]["contentEditorial"]
}

export class ChallengeSubmitedCodeDto {
    readonly challengeId: string;
    readonly userId: string;
    readonly submitedCode: string
}

export class ChallengeDetailsDto {
    readonly difficulty: string;
    readonly skill: string;
    readonly maxScore: number;
    readonly successRatio: string;
}

export class ChallengeCodeSubmissionDto {
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
