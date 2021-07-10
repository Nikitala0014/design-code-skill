import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { IChapter } from '../../interfaces/chapter.interface';


// type SliceState = { state: 'loading' } | { state: 'finished', data: IChapter[] }
const initialState = {
    role: 'User',
    loading: 'Loading',
    chapters: [
        { _id: '1', title: 'Arrays', detail: '70% of companies test this subject' },
        { _id: '2', title: 'Sorting', detail: '40% of companies test this subject' },
        { _id: '3', title: 'Recursion', detail: '20% of companies test this subject' },
        { _id: '4', title: 'Recursion', detail: '20% of companies test this subject' },
        { _id: 'newChapter', title: 'New Chapter', detail: 'Enter this detail of new Chapter' },
    ] as IChapter[],
    course: 'interview',
};

export const fetchChapters = createAsyncThunk('chapters/fetchChapters', 
async () => {
    const response = await fetch('localhost:8000/chapters/getChapters');
    return response.text;
});

export const saveNewChapter = createAsyncThunk('chapters/saveNewChapter', 
async (chapter: IChapter) => {
    const initialChapter = { chapter };
    const response = await fetch(
        'localhost:8000/chapters/addChapter', 
        { method: 'POST', body: initialChapter as any },
    );
    return response.text;
});

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
        chapterCardEditTitle(state, action: PayloadAction<IChapter>) {
            const {_id, title} = action.payload;

            const chapters = state.chapters
            chapters.map((chapter: IChapter) => {
                if (chapter._id === _id) {
                    chapter.title = title;
                }
                return chapter
            })
            state.chapters = chapters;
        },
        chapterCardEditDetail(state, action: PayloadAction<IChapter>) {
            const { _id, detail } = action.payload;
            state.chapters.map((chapter: IChapter) => {
                return chapter._id === _id ? chapter.detail = detail : chapter;
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
            .addCase(saveNewChapter.fulfilled, (_, action) => {
                chaptersAdded(action.payload as any);
            })
            .addCase(fetchChapters.fulfilled, (_, action) => {
                chaptersLoaded(action.payload as any);
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
    chapterCardEditTitle, 
    chapterCardEditDetail,
    deleteChapter,
    chapterRemoved,
    chapterCardUpdated,
} = chaptersSlice.actions;

export default chaptersSlice.reducer;