import React, { useContext } from 'react'
import './ChapterCard.style.scss'

import { useAppDispatch, useAppSelector } from '../../../store/store';
import { 
    saveEditChapterCard, 
    deleteChapter,
} from '../../../store/reducers/chaptersReducer';
import { fetchChallenges } from '../../../store/reducers/challengesReducer';
import { IChapter } from '../../../interfaces/chapter.interface';
import { UserRoleContext } from '../../../Context';

import { ChapterCardView } from './ChapterCardView';

export default function ChapterCard({_id}) {
    const role = useContext(UserRoleContext);
    const course = useAppSelector((state) => state.chapters.course);
    const chapter = useAppSelector((state) => {
        return state.chapters.chapters.find((chapter: IChapter) => chapter._id === _id);
    });
    const title = useAppSelector((state) => {
        return state.chapters.chapters.find((chapter: IChapter) => chapter._id === _id)?.title;
    })
    console.log('title', title);
    
    const dispatch = useAppDispatch();

    const handleSeeChallenges = () => dispatch(fetchChallenges(_id));
    const handleChangeCard = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(saveEditChapterCard({_id, items: [name, value]}))
    }
    const handleDeleteChapter = () => dispatch(deleteChapter(_id));

    return (
        <ChapterCardView
            chapter={chapter}
            callbacks={{
                handleDeleteChapter,
                handleSeeChallenges,
                handleChangeCard,
            }}
            role={role}
            classForCard="chapter-card"
            course={course}
        />
    )
}