import { 
    createSlice,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit';
import { IChallenge } from '../../interfaces/challenge.interface';

export const fetchChallengesBookmarked = createAsyncThunk('user/fetchChallengesBookmarked',
async () => {
    const response = await fetch('http://localhost:8000/user/challengesBookmarked');
    return response.text;
}
)

const initialState = {
    role: 'Root',
    loading: 'Loading',
    user: {
        name: 'Nikita',
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
        }
    }
})

export const {
    userLoaded,
} = userSlice.actions;

export default userSlice.reducer;
