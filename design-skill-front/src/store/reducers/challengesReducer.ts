import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import {
    IChallenge,
    IChallengeCard,
    IChallengeDetails,
} from '../../interfaces/challenge.interface';
import { challenges } from './make-do';

const initialState = {
    filters: {
        status: 'unsolved',
        difficulty: '',
    },
    chapter: '',
    challenges: challenges as IChallenge[],
};
export const fetchChallenges = createAsyncThunk(
    'challenges/fetchChallenges', 
    async (chapterId: string) => {
        const response = await fetch(
            `localhost:8000/challenges/getChallengesByChapterId/${chapterId}`, 
            { method: 'POST' },
        );
        return response.text;
    }
);

export const saveNewChallenge = createAsyncThunk(
    'challenges/saveNewChallenge',
     async (challenge: IChallenge) => {
        const initialChallenge = { challenge };
        const response = await fetch(
            'localhost:8000/challenges/addChallenge',
            { method: 'POST', body: initialChallenge as any },
        );
        return response.text;
    }
);

export const removeChallenge = createAsyncThunk(
    'challenges/removeChallenge',
    async (_id: string) => {
        const response = await fetch(
            `localhost:8000/challenges/removeChallenge/${_id}`,
            { method: 'DELETE' },
        );
        return response.text;
    }
);

interface IChallengeCardUpdate {
    _id: string;
    challengeCardToUpdate: {field: string, value: string}
}

export const updateChallengeCard = createAsyncThunk(
    'challenges/updateChallengeCard',
    async (payload: IChallengeCardUpdate) => {
        const { _id, challengeCardToUpdate } = payload;
        const response = await fetch(
            `localhost:8000/challenges/updateChallengeCard/${_id}`,
            { method: 'UPDATE', body: challengeCardToUpdate as any },
        );
        return response.text;
    }
);

interface IChallengeDetailsUpdate {
    _id: string;
    details: IChallengeDetails
}

export const updateChallengeDetails = createAsyncThunk(
    'challenges/updateChallengeDetails',
    async (payload: IChallengeDetailsUpdate) => {
        const { _id, details } = payload;
        const response = await fetch(
            `localhost:8000/challenges/updateChallengeDetails/${_id}`,
            { method: 'UPDATE', body: details as any },
        );
        return response.text;
    }
);

interface ContentProblemUpdate {
    _id: string,
    contentProblem: string,
}

export const updateChallengeContentProblem = createAsyncThunk(
    'challenges/updateChallengeContentProblem',
    async (payload: ContentProblemUpdate) => {
        const { _id, contentProblem } = payload
        const response = await fetch(
            `localhost:8000/challenges/updateChallengeContentProblem/${_id}`,
            { method: 'UPDATE', body: contentProblem as any },
        );
        return response.text;
    }
);

interface ContentCodeUpdate {
    _id: string,
    contentCode: string,
}

export const updateChallengeContentCode = createAsyncThunk(
    'challenges/updateChallengeContentCode',
    async (payload: ContentCodeUpdate) => {
        const { _id, contentCode } = payload;
        const response = await fetch(
            `localhost:8000/challenges/updateChallengeContentCode/${_id}`,
            { method: 'UPDATE', body: contentCode as any }
        );
        return response.text
    }
)

const challengesSlice = createSlice({
    name: 'challenges',
    initialState,
    reducers: {
        challengesLoaded(state, action: PayloadAction<IChallenge[]>) {
            state.challenges = action.payload;
        },
        challengesAdded(state, action: PayloadAction<IChallenge>) {
            state.challenges.push(action.payload);
        },
        newStatusFilter(state, action: PayloadAction<string>) {
            const status = state.filters.status === action.payload ? '' : action.payload;
            state.filters.status = status;
        },
        newDifficultyFilter(state, action: PayloadAction<string>) {
            const diff = state.filters.difficulty === action.payload ? '' : action.payload;
            state.filters.difficulty = diff;
        },
        challengeEditTitle(state, action: PayloadAction<{_id: string, title: string}>) {
            const { _id, title } = action.payload;
            state.challenges.map((challenge) => challenge._id === _id ? challenge.title = title
            : challenge)
        },
        challengeEdit(state, action: PayloadAction<{_id: string, item: string[]}>) {
            const { _id, item } = action.payload;
            const name = item[0]
            const value = item[1]
            state.challenges.map((challenge) => {
                if (challenge._id === _id) {
                    switch (name) {
                        case 'challenge-title':
                            return challenge.title = value;
                        case 'challenge-difficulty':
                            return challenge.details.difficulty = value;
                        case 'challenge-skill':
                            return challenge.details.skill = value;
                        case 'challenge-maxScore':
                            return challenge.details.maxScore = value;
                        case 'challenge-successRatio':
                            return challenge.details.successRatio = value;
                        case 'challenge-preview':
                            return challenge.preview = value;
                        default:
                            break;
                    }
                }
                return challenge;
            });
        },
        challengeDelete(state, action: PayloadAction<string>) {
            state.challenges.filter((challenge) => challenge._id !== action.payload);
        },
        challengeRemoved(state, action: PayloadAction<string>) {
            state.challenges.filter((challenge) => challenge._id !== action.payload);
        },
        challengeCardUpdated(state, action: PayloadAction<IChallengeCard>) {
            const { _id, details, ...challengeCard } = action.payload;
            state.challenges.map((challenge) => {
                return challenge._id === _id ? 
                    {challengeCard, ...challenge.details} : challenge;
            });
        },
        challengeDetailsUpdated(state, action: PayloadAction<
            { _id: string, challengeDetails: IChallengeDetails }
        >) {
            const { _id, challengeDetails } = action.payload;
            state.challenges.map((challenge) => {
                return challenge._id === _id 
                    ? challenge.details = challengeDetails : challenge;
            });
        },
        challengeContentProblemUpdated(state, action: PayloadAction<
            { _id: string, challengeContentProblem: string }
        >) {
            const { _id, challengeContentProblem } = action.payload;
            state.challenges.map((challenge) => {
                return challenge._id === _id 
                    ? challenge.content.contentProblem = challengeContentProblem
                    : challenge;
            });
        },
        challengeContentCodeUpdated(state, action: PayloadAction<
            { _id: string, challengeContentCode: string }
        >) {
            const { _id, challengeContentCode } = action.payload;
            state.challenges.map((challenge) => {
                return challenge._id === _id
                    ? challenge.content.contentCode = challengeContentCode
                    : challenge;
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChallenges.fulfilled, (_, action) => {
                challengesLoaded(action.payload as any);
            })
            .addCase(saveNewChallenge.fulfilled, (_, action) => {
                challengesAdded(action.payload as any);
            })
            .addCase(removeChallenge.fulfilled, (_, action) => {
                challengeRemoved(action.payload as any);
            })
            .addCase(updateChallengeCard.fulfilled, (_, action) => {
                challengeCardUpdated(action.payload as any);
            })
            .addCase(updateChallengeDetails.fulfilled, (_, action) => {
                challengeDetailsUpdated(action.payload as any);
            })
            .addCase(updateChallengeContentProblem.fulfilled, (_, action) => {
                challengeContentProblemUpdated(action.payload as any);
            })
            .addCase(updateChallengeContentCode.fulfilled, (_, action) => {
                challengeContentCodeUpdated(action.payload as any);
            })
    }
});

export const { 
    challengesLoaded, 
    challengesAdded,
    newStatusFilter,
    newDifficultyFilter,
    challengeEdit,
    challengeDelete,
    challengeEditTitle,
    challengeRemoved,
    challengeCardUpdated,
    challengeDetailsUpdated,
    challengeContentProblemUpdated,
    challengeContentCodeUpdated,
} = challengesSlice.actions;

export default challengesSlice.reducer;