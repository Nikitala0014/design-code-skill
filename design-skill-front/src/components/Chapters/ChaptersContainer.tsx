import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import './Chapters.style.scss';

import ChapterCard from '../Cards/ChapterCard/ChapterCardContainer';
import { fetchChapters } from '../../store/reducers/chaptersReducer';

import { ChaptersView } from './ChaptersView';
import { IChapter } from '../../interfaces/chapter.interface';

export default function Chapters() {
    const role = useSelector((state: RootState) => state.chapters.role);
    // const course = useSelector((state: RootState) => state.chapters.course);
    const chapters = useSelector((state: RootState) => state.chapters.chapters);
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchChapters);
    }, [dispatch]);

    const chaptersForUser = chapters.filter((chapter) => chapter._id !== 'newChapter');
    const rightChapters = role === 'User' ? chaptersForUser : chapters

    const renderedListChapterCard = rightChapters.map((card: IChapter) => {
        if (card._id === 'newChapter') {
            return (
                <ChapterCard
                    key={card._id}
                    _id={card._id}
                    route={card.route}
                    classNameChapter='new-chapter-card'
                />
            )
        }
        return (
            <ChapterCard 
                key={card._id as string} 
                _id={card._id as string} 
                route={card.route as string}
                classNameChapter='chapter-card'
            />
        )
    })

    return <ChaptersView
        renderedListChapterCard={renderedListChapterCard}
    />
}
