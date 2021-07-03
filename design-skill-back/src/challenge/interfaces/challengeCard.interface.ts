import { IChallengeDetails } from './challenge.interface';

export interface IChallengeCard {
    readonly _id: string;
    readonly title: string;
    readonly details: IChallengeDetails;
    readonly preview: string;
}