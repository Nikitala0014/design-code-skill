/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import './ChallengeCard.style.scss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState, useAppDispatch } from '../../../store/store';
import { 
    challengeEdit, 
    challengeDelete,
    challengesAdded,
    challengeEditTitle,
} from '../../../store/reducers/challengesReducer';
import { IChallenge } from '../../../interfaces/challenge.interface';

import { ChallengeCardView } from './ChallengeCardView';

interface ChallengeRouteParams {
    chapterTitle: string
}

export default function ChallengeCard({_id, route, classNameChallenge}) {
    const role = useSelector((state: RootState) => state.chapters.role);
    const challenge = useSelector((state: RootState) => {
        const challenge = state.challenges.challenges.find((challenge: IChallenge) => challenge._id === _id);
        return {
            title: challenge?.title,
            status: challenge?.status,
            details: challenge?.details,
            preview: challenge?.preview,

        };
    });
    const { title, status, details, preview } = challenge;
    const [_title, setTitle] = useState(title);
    const course = useSelector((state: RootState) => state.chapters.course);
    const { chapterTitle } = useParams<ChallengeRouteParams>();
    const dispatch = useAppDispatch();

    console.log('chapter title', chapterTitle);

    const handleChangeTitle = (e) => setTitle(e.target.value)

    const handleChangeChallenge = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(challengeEdit({_id, item: [name, value]}));
    }
    useEffect(() => {
        console.log('title from', _title);
        
        dispatch(challengeEditTitle({_id, title: _title as string}));
    }, [_id, _title, dispatch]);

    const handleDeleteChallenge = () => dispatch(challengeDelete(_id))
    // console.log('title', title);
    // console.log('difficulty', details?.difficulty);
    // console.log('preview', preview);
    
    
    const handleAddChallenge = (e) => dispatch(challengesAdded({
        _id: details?.maxScore,
        title: title as string,
        status: 'unsolved',
        details: {
            difficulty: details?.difficulty as string,
            skill: details?.skill as string,
            maxScore: details?.maxScore as string,
            successRatio: details?.successRatio as string,
        },
        content: {
            contentProblem: '',
            contentCode: '',
        },
        preview: preview as string,
    }));
    
    return (
        <ChallengeCardView
            challenge={{
                _id: _id as string,
                title: title as string,
                status: status as string,
                details: details as IChallenge["details"],
                preview: preview as string,
                route: route as string,
            }}
            role={role}
            callbacks={{
                handleChangeChallenge, 
                handleDeleteChallenge,
                handleAddChallenge,
                handleChangeTitle,
            }}
            style={classNameChallenge}
            chapter={chapterTitle}
            course={course}
        />
    )
}
