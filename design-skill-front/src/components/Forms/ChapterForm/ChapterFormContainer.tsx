import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/store';

import { IChapter } from '../../../interfaces/chapter.interface';
import { ChapterCardView } from '../../Cards/ChapterCard/ChapterCardView';
import { saveNewChapter } from '../../../store/reducers/chaptersReducer';

export const ChapterForm = () => {
    const role = useAppSelector((state) => state.user.user.role);
    // context
    const course = useAppSelector((state) => state.chapters.course);
    const [title, setTitle] = useState('Chapter Name');
    const [detail, setDetail] = useState('Enter here detail of new chapter');
    const dispatch = useAppDispatch();

    const handleAddChapter = async () => {
        await dispatch(saveNewChapter({
            title: title,
            detail: detail
        } as IChapter));
        setTitle('Chapter Name');
        setDetail('Enter here detail of new chapter');
    }

    const handleChangeCard = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'chapter-title':
                setTitle(value)
                break;
            case 'chapter-detail':
                setDetail(value)
                break
            default:
                break;
        }
    }

    return (
        <ChapterCardView
            chapter={{
                _id: '0',
                title: title,
                detail: detail,
            }}
            callbacks={{
                handleChangeCard,
                handleAddChapter
            }}
            role={role}
            course={course}
            classForCard="chapter-card-form-to-add"
        />
    )
}


