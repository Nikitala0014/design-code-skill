import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { server } from '../../utils/helper'
import produce from 'immer'

import { IChapter } from '../../interfaces/chapter.interface';
import authHeader from '../../utils/authHeader';


// type SliceState = { state: 'loading' } | { state: 'finished', data: IChapter[] }
const initialState = {
    status: 'loading',
    chapters: [] as IChapter[],
    course: 'interview',
};

export const fetchChapters = createAsyncThunk('chapters/fetchChapters', 
async () => {
    return await axios.get(
        `${server.baseUrl}/chapters/fetchChapters`,
        { headers: authHeader() },
    ).then((res) => res.data)
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

export const saveEditChapterCard = createAsyncThunk('chaptes/saveEditChapterCard',
async (payload: {_id: string, items: string[]}) => {
    const { _id, items } = payload;
    return await axios.put(`${server.baseUrl}/chapters/saveEditChapterCard/${_id}`,
        items,
        { headers: authHeader() },
    ).then((res) => res.data);
})

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
                    chapters: action.payload,
                    status: 'working',
                }
            })
            .addCase(fetchChapters.rejected, (
                state, action
            ) => {
                return {
                    ...state,
                    status: 'failed',
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
            .addCase(saveEditChapterCard.fulfilled, (
                state, action: PayloadAction<IChapter>,
            ) => {
                const { _id } = action.payload;
                // state.chapters.map((chapter) => {
                //     return chapter._id === _id ? action.payload : chapter;
                // })
                return produce(state, draft => {
                    draft.chapters = draft.chapters.map((chapter) => {
                        return chapter._id === _id 
                        ? produce(chapter, draft => {
                            draft.title = action.payload.title
                            draft.detail = action.payload.detail
                        })
                        : chapter;
                    })
                })
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