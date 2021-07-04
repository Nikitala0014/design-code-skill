import React from 'react'
import { useSelector } from 'react-redux';
import './ChapterCard.style.scss'

import { RootState, useAppDispatch } from '../../../store/store';
import { 
    chapterCardEditTitle, 
    chapterCardEditDetail, 
    deleteChapter, 
    chaptersAdded,
} from '../../../store/reducers/chaptersReducer';
import { fetchChallenges } from '../../../store/reducers/challengesReducer';
import { IChapter } from '../../../interfaces/chapter.interface';

import { ChapterCardView } from './ChapterCardView';

export default function ChapterCard({_id, route, classNameChapter}) {
    const role = useSelector((state: RootState) => state.chapters.role);
    const course = useSelector((state: RootState) => state.chapters.course);
    const title = useSelector((state: RootState) => {
        const chapter = state.chapters.chapters.find((chapter: IChapter) => chapter._id === _id);
        return chapter?.title;
    });
    const detail = useSelector((state: RootState) => {
        const chapter = state.chapters.chapters.find((chapter: IChapter) => chapter._id === _id);
        return chapter?.detail;
    });
    const dispatch = useAppDispatch();

    const handleSeeChallenges = () => dispatch(fetchChallenges(_id));
    const handleChangeTitle = (e) => dispatch(chapterCardEditTitle({_id, title: e.target.value, detail: ''}));
    const handleChangeDetail = (e) => dispatch(chapterCardEditDetail({_id, title: '', detail: e.target.value}));
    const handleDeleteChapter = () => dispatch(deleteChapter(_id));
    const handleAddChapter = () => {dispatch(chaptersAdded({_id: '10', title: title as string, detail: detail as string}))}

    return (
        <ChapterCardView
            chapter={{_id, title, detail, route}}
            callbacks={{
                handleChangeTitle,
                handleChangeDetail,
                handleAddChapter,
                handleDeleteChapter,
                handleSeeChallenges,
            }}
            role={role}
            style={classNameChapter}
            course={course}
        />
    )
}