export interface IChallenge {
    _id?: string;
    chapter?: {chapterId: string, chapterName: string};
    title: string;
    status: string;
    details: IChallengeDetails;
    preview: string;
    content: {contentProblem: string, contentCode: string};
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