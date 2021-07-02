import React, { useState } from 'react';
import { useAppDispatch } from '../../../redux/store';

import { ChapterFormView } from './ChapterFormView';
import { saveNewChapter } from '../../../redux/reducers/chaptersReducer';

export default function ChapterForm() {
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const dispatch = useAppDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(saveNewChapter({title, detail}));
        setTitle('');
        setDetail('');
    }

    function handleChange(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'title':
                setTitle(value)
                break;
            case 'detail':
                setDetail(value)
                break
            default:
                break;
        }
    }

    return (
        <ChapterFormView
            title={title}
            detail={detail}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    )
}


