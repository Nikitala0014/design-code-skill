import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { server } from '../../utils/helper';

import {
    IChallenge,
    IChallengeCard,
    IChallengeDetails,
    IContentSubmission,
} from '../../interfaces/challenge.interface';
// import { challenges } from './make-do';

const initialState = {
    chapterId: '',
    challengeId: '',
    submitedCodeId: '',
    challenges: [] as IChallenge[],
};

export const valideSubmitedCode = createAsyncThunk (
    'challenges/valideSubmitedCode',
    async (payload: {challengeId: string, userId: string, submitedCode: string}) => {
        return await axios.post(
            `${server.baseUrl}/challenges/valideSubmitedCode`,
            payload,
        ).then((res) => res.data).catch((error) => error);
    } 
)

export const fetchChallenges = createAsyncThunk (
    'challenges/fetchChallenges',
    async (chapterId: string) => {
        return await axios.get(
            `${server.baseUrl}/challenges/fetchChallenges/${chapterId}`
        ).then((res) => res.data).catch((error) => error)
    }
)

export const saveNewChallenge = createAsyncThunk (
    'challenges/saveNewChallenge',
    async (payload: IChallenge) => {
        return await axios.post(
            `${server.baseUrl}/challenges/saveNewChallenge`,
            payload
        ).then((res) => res.data).catch((error) => error)
    }
);

export const saveEditContentProblem = createAsyncThunk (
    'challenges/saveEditContentProblem',
    async (payload: {_id: string, contentProblem: string}) => {
        const { _id, contentProblem } = payload;
        return await axios.put(
            `${server.baseUrl}/challenges/saveEditContentProblem/${_id}`,
            { contentProblem: contentProblem },
        ).then((res) => res.data).catch((error) => error);
    }
)

export const saveEditContentCode = createAsyncThunk (
    'challenges/saveEditContentCode',
    async (payload: {
        _id: string, 
        contentCode: {
            code: string,
            cases: IChallenge["content"]["contentCode"]["cases"]
        }
    }
    ) => {
        const { _id, contentCode } = payload;
        return await axios.put(
            `${server.baseUrl}/challenges/saveEditContentCode/${_id}`,
            { contentCode: contentCode },
        ).then((res) => res.data).catch((error) => error);
    }
)

export const saveEditContentEditorial = createAsyncThunk (
    'challenges/saveEditContentEditorial',
    async (payload: {_id: string, contentEditorial: string}) => {
        const { _id, contentEditorial } = payload;
        return await axios.put(
            `${server.baseUrl}/challenges/saveEditContentEditorial/${_id}`,
            { contentEditorial: contentEditorial },
        ).then((res) => res.data).catch((error) => error);
    }
)

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

export const updateChallengeContentCode = createAsyncThunk (
    'challenges/updateChallengeContentCode',
    async (payload: ContentCodeUpdate) => {
        const { _id, contentCode } = payload;
        const response = await fetch (
            `localhost:8000/challenges/updateChallengeContentCode/${_id}`,
            { method: 'UPDATE', body: contentCode as any, }
        );
        return response.text
    }
)

const challengesSlice = createSlice({
    name: 'challenges',
    initialState,
    reducers: {
        challengesLoaded(
            state, 
            action: PayloadAction<{chapterId: string, challenges: IChallenge[]}>,
        ) {
            state.chapterId = action.payload.chapterId;
            state.challenges = action.payload.challenges;
        },
        challengeAdded(state, action: PayloadAction<IChallenge>) {
            console.log('challenge added with data: ', action.payload);
            return {...state, challenges: [
                ...state.challenges,
                action.payload
            ]}
        },
        setChallengeId(state, action: PayloadAction<string>) {
            state.challengeId = action.payload;
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
                    ? challenge.content.contentCode.code = challengeContentCode
                    : challenge;
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(valideSubmitedCode.fulfilled, (
                state, action: PayloadAction<IContentSubmission>
            ) => {
                state.challenges.map((challenge) => {
                    return challenge._id === action.payload.challengeId 
                        ? challenge.challengeCodeSubmissions?.push(action.payload)
                        : challenge;
                })
                state.submitedCodeId = action.payload.submitedCodeId;
            })
            .addCase(fetchChallenges.fulfilled, (
                state, 
                action: PayloadAction<{chapterId: string, challenges: IChallenge[]}>
            ) => {
                const { chapterId, challenges } = action.payload;
                return {
                    ...state, 
                    challenges: challenges || [] as IChallenge[],
                    chapterId: chapterId || '',
                }
            })
            .addCase(saveNewChallenge.fulfilled, (
                state, 
                action: PayloadAction<IChallenge>,
            ) => {
                return {...state, challenges: [
                    ...state.challenges,
                    action.payload
                ]}
            })
            .addCase(saveEditContentProblem.fulfilled, (
                state, action: PayloadAction<IChallenge> 
            ) => {
                const { _id, content } = action.payload;
                state.challenges.map((challenge) => {
                    return challenge._id === _id 
                        ? challenge.content.contentProblem = content.contentProblem
                        : challenge;
                })
            })
            .addCase(saveEditContentCode.fulfilled, (
                state, action: PayloadAction<IChallenge> 
            ) => {
                const { _id, content } = action.payload;
                state.challenges.map((challenge) => {
                    return challenge._id === _id 
                        ? challenge.content.contentCode = content.contentCode
                        : challenge;
                })
            }) 
            .addCase(saveEditContentEditorial.fulfilled, (
                state, action: PayloadAction<IChallenge> 
            ) => {
                const { _id, content } = action.payload;
                state.challenges.map((challenge) => {
                    return challenge._id === _id 
                        ? challenge.content.contentEditorial = content.contentEditorial
                        : challenge
                })
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
    challengeAdded,
    challengeEdit,
    challengeDelete,
    challengeEditTitle,
    challengeRemoved,
    challengeCardUpdated,
    challengeDetailsUpdated,
    challengeContentProblemUpdated,
    challengeContentCodeUpdated,
    setChallengeId,
} = challengesSlice.actions;

export default challengesSlice.reducer;