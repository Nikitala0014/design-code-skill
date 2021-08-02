import { 
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

import { IUser, IUserChallenge } from '../../interfaces/user.interface';
import { server } from '../../utils/helper';
import authHeader from '../../utils/authHeader';

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

export const isLogin = createAsyncThunk('auth/isLogin',
    async () => {
        return await axios.get(`${server.baseUrl}/auth/isLogin`,
            { headers: authHeader() }
        ).then((res) => res.data)
    }
)

export const fetchUserChallenges = createAsyncThunk('auth/fetchUserChallenges',
async (userId: string) => {
    return await axios.get(
        `${server.baseUrl}/auth/fetchUserChallenges/${userId}`,
        { headers: authHeader() }
    ).then((res) => res.data);
}
)

const initialState = {
    loggedIn: false,
    errorMessage: '',
    status: 'loading',
    user: {
        role: 'Root',
        _id: '',
        username: '',
    },
    challengesBookmarked: [] as IUserChallenge[],
    challengesSolved: [] as IUserChallenge[],
    challengesAttempted: [] as IUserChallenge[]
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        statusIsLoading(state, action) {
            state.status = 'loading'
        }
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
                state.loggedIn = false
                state.status = 'failed';
                state.errorMessage = 'Username or password incorrect';
            })
            .addCase(isLogin.fulfilled, (
                state, action: PayloadAction<IUser>
            ) => {
                state.loggedIn = true;
                state.status = 'working';
                state.user = action.payload;
            })
            .addCase(isLogin.rejected, (
                state, action
            ) => {
                state.status = 'failed';
                state.loggedIn = false
            })
            .addCase(fetchUserChallenges.fulfilled, (
                state, 
                action: PayloadAction<
                    {
                        challengesAttempted: IUserChallenge[], 
                        challengesSolved: IUserChallenge[]
                    }
                >
            ) => {
                const { challengesAttempted, challengesSolved } = action.payload;
                state.challengesAttempted = challengesAttempted;
                state.challengesSolved = challengesSolved;
                state.status = 'working'
            })
    }
})

export const {
    statusIsLoading
} = userSlice.actions;

export default userSlice.reducer;
