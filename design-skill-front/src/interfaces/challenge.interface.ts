export interface IChallenge {
    _id?: string;
    chapter?: {chapterId: string, chapterName: string};
    title: string;
    status: string;
    details: {
        difficulty: string;
        skill: string;
        maxScore: string;
        successRatio: string;
    };
    preview: string;
    content?: {contentProblem: string, contentCode: string};
    route?: string;
}