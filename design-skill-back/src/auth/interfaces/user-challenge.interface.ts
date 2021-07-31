import { IChallengeDetails } from '../../challenge/interfaces/challenge.interface';

export interface IUserChallenge {
    readonly _id: string;
    readonly chapterName: string;
    readonly title: string;
    readonly details: IChallengeDetails;
    readonly preview: string;
}