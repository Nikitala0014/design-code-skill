import { 
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { IUser } from '../../interfaces/user.interface';
import { IChallenge } from '../../interfaces/challenge.interface';
import { server } from '../../utils/helper';

export const createAnAccount = createAsyncThunk('auth/createAnAccount',
async (payload: {_username: string, _password: string, _role: string}) => {
    return await axios.post(`${server.baseUrl}/auth/createAnAccount`, payload)
        .then((res) => {
            res.data.accessToken && 
            localStorage.setItem('accessTokenDesignSkillCode', res.data.accessToken);
            return res.data.user
        })
        .then((user) => user).catch((error) => error);
})

export const logInAccount = createAsyncThunk('auth/logInAccount',
async (payload: {_username: string, _password: string}) => {
    return await axios.post(`${server.baseUrl}/auth/logInAccount`, payload)
    .then((res) => {
        res.data.accessToken && 
        localStorage.setItem('accessTokenDesignSkillCode', res.data.accessToken);
        return res.data
    })
    .then((data) => data.user);
})

export const fetchChallengesBookmarked = createAsyncThunk('user/fetchChallengesBookmarked',
async () => {
    const response = await fetch('http://localhost:8000/user/challengesBookmarked');
    return response.text;
}
)

const initialState = {
    loggedIn: false,
    errorMessage: '',
    status: 'loading',
    user: {
        role: 'Root',
        _id: '1',
        username: 'Nikita',
    },
    challengesBookmarked: [] as IChallenge[],
    challengesSolved: [] as IChallenge[],
    challengesAttempted: [] as IChallenge[]
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userLoaded(state, action: PayloadAction<IChallenge[]>) {
            state.challengesBookmarked = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAnAccount.fulfilled, (
                state, action: PayloadAction<IUser>,
            ) => {
                return {...state, user: action.payload, loggedIn: true}
            })
            .addCase(logInAccount.fulfilled, (
                state, action: PayloadAction<IUser>,
            ) => {
                return {...state, user: action.payload, loggedIn: true}
            })
            .addCase(logInAccount.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = 'Username or password incorrect';
            })
    }
})

export const {
    userLoaded,
} = userSlice.actions;

export default userSlice.reducer;
