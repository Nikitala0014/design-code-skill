import { configureStore } from '@reduxjs/toolkit'

import chaptersReducer from './reducers/chaptersReducer';
import challengesReducer from './reducers/challengesReducer';
import userReducer from './reducers/userReducer';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        user: userReducer,
        chapters: chaptersReducer,
        challenges: challengesReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;