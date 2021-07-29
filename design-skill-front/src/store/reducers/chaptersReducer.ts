import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { server } from '../../utils/helper'

import { IChapter } from '../../interfaces/chapter.interface';


// type SliceState = { state: 'loading' } | { state: 'finished', data: IChapter[] }
const initialState = {
    loading: 'Loading',
    chapters: [] as IChapter[],
    course: 'interview',
};

export const fetchChapters = createAsyncThunk('chapters/fetchChapters', 
async () => {
    return await axios.get(
        `${server.baseUrl}/chapters/fetchChapters`
    ).then((res) => res.data).catch((error) => error);
});

export const saveNewChapter = createAsyncThunk(
    'chapters/saveNewChapter',
    async(payload: IChapter) => {
        return await axios.post(
            `${server.baseUrl}/chapters/saveNewChapter`,
            payload,
        ).then((res) => res.data).catch((error) => error);
    }
)

export const removeChapter = createAsyncThunk('chapters/removeChapter', 
async ({_id}: IChapter) => {
    const response = await fetch(
        'localhost:8000/chapters/removeChapter',
        { method: 'POST', body: _id },
    );
    return response.text;
});

interface IChapterCardUpdate {
    _id: string;
    field: string;
    value: string;
}

export const updateChapterCard = createAsyncThunk('chapters/updateChapterCard',
async(payloud: IChapterCardUpdate) => {
    const response = await fetch(
        'localhost:8000/chapters/updateChapterCard',
        { method: 'POST', body: payloud as any },
    );
    return response.text;
})

const chaptersSlice = createSlice({
    name: 'chapters',
    initialState,
    reducers: {
        chaptersLoaded(state, action: PayloadAction<IChapter[]>) {
            state.chapters = action.payload;
        },
        chaptersAdded(state, action: PayloadAction<IChapter>) {
            state.chapters.push(action.payload)
        },
        chapterEdit(state, action: PayloadAction<{_id: string, item: string[]}>) {
            const { _id, item } = action.payload;
            const [name, value] = [item[0], item[1]];
            state.chapters.map((chapter: IChapter) => {
                if (chapter._id === _id) {
                    switch (name) {
                        case 'chapter-title':
                            return chapter.title = value;
                        case 'chapter-detail':
                            return chapter.detail = value;
                        default:
                            break;
                    }
                }
                return chapter;
            })
        },
        deleteChapter(state, action: PayloadAction<string>) {
            state.chapters = state.chapters.filter(
                (chapter) => chapter._id !== action.payload);
        },
        chapterRemoved(state, action: PayloadAction<string>) {
            state.chapters = state.chapters.filter(
                (chapter) => chapter._id !== action.payload)
        },
        chapterCardUpdated(state, action: PayloadAction<
            { _id: string, chapterUpdated: IChapter }
        >) {
            const { _id, chapterUpdated } = action.payload;
            state.chapters.map((chapter) => {
                return chapter._id === _id ? chapterUpdated : chapter;
            })
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChapters.fulfilled, (
                state, action: PayloadAction<IChapter[]>
            ) => {
                return {
                    ...state,
                    chapters: action.payload
                }
            })
            .addCase(saveNewChapter.fulfilled, (state, action) => {
                return {
                    ...state,
                    chapters: [
                        ...state.chapters,
                        action.payload,
                    ]
                }
            })
            .addCase(removeChapter.fulfilled, (_, action) => {
                chapterRemoved(action.payload as any);
            })
            .addCase(updateChapterCard.fulfilled, (_, action) => {
                chapterCardUpdated(action.payload as any)
            })
    }
})

export const {
    chaptersLoaded, 
    chaptersAdded, 
    chapterEdit, 
    deleteChapter,
    chapterRemoved,
    chapterCardUpdated,
} = chaptersSlice.actions;

export default chaptersSlice.reducer;