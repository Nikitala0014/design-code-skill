import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { IChallenge } from '../../interfaces/challenge.interface';
import { content, code } from './make-do';

const initialState = {
    filters: {
        status: 'unsolved',
        difficulty: '',
    },
    chapter: '',
    challenges: [
        {
            _id: '1',
            title: 'Minimum Swaps 2',
            status: 'unsolved',
            details: {
                difficulty: 'Medium',
                skill: 'Intermediate',
                maxScore: '40',
                successRatio: '76.10%',
            },
            preview: 'Return the minimum number of swaps to sort the given array.',
            content: {
                contentProblem: content,
                contentCode: code,
            }
        },
        {
            _id: '2',
            title: '2D Array - DS',
            status: 'unsolved',
            details: {
                difficulty: 'Easy',
                skill: 'Basic',
                maxScore: '15',
                successRatio: '92.91%',
            },
            preview: 'Return the minimum number of swaps to sort the given array.',
        },
        {
            _id: '3',
            title: 'Array Manipulation',
            status: 'unsolved',
            details: {
                difficulty: 'Hard',
                skill: 'Intermediate',
                maxScore: '60',
                successRatio: '56.81%',
            },
            preview: 'Return the minimum number of swaps to sort the given array.',
        },
        {
            _id: 'newChallenge',
            title: 'Challenge Name',
            status: 'unsolved',
            details: {
                difficulty: 'Hard',
                skill: 'Intermediate',
                maxScore: '60',
                successRatio: '56.81%',
            },
            preview: 'Enter here short preview for this challenge',
        },
    ] as IChallenge[],
};

export const fetchChallenges = createAsyncThunk('challenges/fetchChallenges', async (chapterId: string) => {
    const response = await fetch(
        'localhost:8000/challenges/getChallenges', 
        {method: "POST", body: chapterId as any},
    );
    return response.text;
});
export const saveNewChallenge = createAsyncThunk(
    'challenges/saveNewChallenge', async (challenge: IChallenge) => {
        const initialChallenge = { challenge };
        const response = await fetch(
            'localhost:8000/challenges/addChallenge',
            {method: "POST", body: initialChallenge as any}
        )
        return response.text;
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
            state.challenges = state.challenges.filter((challenge) => challenge._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChallenges.fulfilled, (state, action) => {
                challengesLoaded(action.payload as any);
            })
            .addCase(saveNewChallenge.fulfilled, (state, action) => {
                challengesAdded(action.payload as any);
            })
    }
})
export const { 
    challengesLoaded, 
    challengesAdded,
    newStatusFilter,
    newDifficultyFilter,
    challengeEdit,
    challengeDelete,
    challengeEditTitle,
} = challengesSlice.actions;

export default challengesSlice.reducer;