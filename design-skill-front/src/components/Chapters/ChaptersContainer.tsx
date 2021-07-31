import React, { useEffect, useContext } from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../store/store';
import './Chapters.style.scss';

import ChapterCard from '../Cards/ChapterCard/ChapterCardContainer';
import { fetchChapters } from '../../store/reducers/chaptersReducer';
import { isLogin } from '../../store/reducers/userReducer';

import { UserRoleContext } from '../../Context';
import { ChaptersView } from './ChaptersView';
import { IChapter } from '../../interfaces/chapter.interface';

export default function Chapters() {
    const role = useContext(UserRoleContext)
    const chapters = useAppSelector((state: RootState) => state.chapters.chapters);
    const dispatch = useAppDispatch()

    useEffect(() => {
        console.log('effect chapters');
        
        dispatch(isLogin())
    }, [dispatch])

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
