import { IChallengeDetails } from './challenge.interface'

export interface IUser {
    _id: string;
    role: string;
    username: string;
    challengesBookmarked?: IUserChallenge[];
    challengesSolved?: IUserChallenge[];
    challengesAttempted?: IUserChallenge[];
}

export interface IUserChallenge {
    _id: string;
    chapterName: string;
    details: IChallengeDetails;
    title: string;
    preview: string;
}
