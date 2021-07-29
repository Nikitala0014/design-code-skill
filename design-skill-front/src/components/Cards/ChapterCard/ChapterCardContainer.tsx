import React from 'react'
import { useSelector } from 'react-redux';
import './ChapterCard.style.scss'

import { RootState, useAppDispatch } from '../../../store/store';
import { 
    chapterEdit, 
    deleteChapter,
} from '../../../store/reducers/chaptersReducer';
import { fetchChallenges } from '../../../store/reducers/challengesReducer';
import { IChapter } from '../../../interfaces/chapter.interface';

import { ChapterCardView } from './ChapterCardView';

export default function ChapterCard({_id}) {
    const role = useSelector((state: RootState) => state.user.user.role);
    const course = useSelector((state: RootState) => state.chapters.course);
    const chapter = useSelector((state: RootState) => {
        return state.chapters.chapters.find((chapter: IChapter) => chapter._id === _id);
    });
    const dispatch = useAppDispatch();

    const handleSeeChallenges = () => dispatch(fetchChallenges(_id));
    const handleChangeCard = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(chapterEdit({_id, item: [name, value]}))
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