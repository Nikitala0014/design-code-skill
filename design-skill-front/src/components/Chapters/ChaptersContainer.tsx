import React, { useEffect } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import './Chapters.style.scss';

import ChapterCard from '../Cards/ChapterCard/ChapterCardContainer';
import { fetchChapters } from '../../store/reducers/chaptersReducer';

import { ChaptersView } from './ChaptersView';
import { IChapter } from '../../interfaces/chapter.interface';

export default function Chapters() {
    // context
    const role = useAppSelector((state: RootState) => state.user.user.role);
    // context
    // const course = useSelector((state: RootState) => state.chapters.course);
    const chapters = useAppSelector((state: RootState) => state.chapters.chapters);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchChapters());
    }, [dispatch]);

    const renderedListChapterCard = chapters && chapters.map((card: IChapter) => {
        return (
            <ChapterCard 
                key={card._id as string} 
                _id={card._id as string} 
            />
        )
    })

    return <ChaptersView
        renderedListChapterCard={renderedListChapterCard}
        role={role}
    />
}
