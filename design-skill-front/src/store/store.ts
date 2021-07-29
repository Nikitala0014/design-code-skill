import { configureStore, AnyAction, ThunkAction } from '@reduxjs/toolkit'

import chaptersReducer from './reducers/chaptersReducer';
import challengesReducer from './reducers/challengesReducer';
import userReducer from './reducers/userReducer';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

const store = configureStore({
    reducer: {
        user: userReducer,
        chapters: chaptersReducer,
        challenges: challengesReducer,
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;