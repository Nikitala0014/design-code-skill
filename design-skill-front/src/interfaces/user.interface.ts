export interface IUser {
    _id: string;
    role: string;
    username: string;
    challengesBookmarked?: string[];
    challengesSolved?: string[];
    challengesAttempted?: string[];
}
