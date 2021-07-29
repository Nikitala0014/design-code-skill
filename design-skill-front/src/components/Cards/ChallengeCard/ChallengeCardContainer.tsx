import React, { useEffect } from 'react';
import './ChallengeCard.style.scss';
import { useParams } from 'react-router-dom';

import { RootState, useAppDispatch, useAppSelector } from '../../../store/store';
import { 
    challengeEdit, 
    challengeDelete,
    setChallengeId,
} from '../../../store/reducers/challengesReducer';
import { IChallenge } from '../../../interfaces/challenge.interface';

import { ChallengeCardView } from './ChallengeCardView';

interface ChallengeRouteParams {
    chapterName: string;
}

export default function ChallengeCard({_id}) {
    const role = useAppSelector((state: RootState) => state.user.user.role);
    const challenge = useAppSelector((state: RootState) => {
        const challenge = state.challenges.challenges.find((challenge: IChallenge) => challenge._id === _id);
        return {
            title: challenge?.title,
            status: challenge?.status,
            details: challenge?.details,
            preview: challenge?.preview,
        }
    });
    const { title, details, preview } = challenge;
    const course = useAppSelector((state: RootState) => state.chapters.course);
    const { chapterName } = useParams<ChallengeRouteParams>();
    const dispatch = useAppDispatch();

    const handleSolveChallenge = () => dispatch(setChallengeId(_id));

    const handleChangeCard = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(challengeEdit({_id, item: [name, value]}));
    }
    useEffect(() => {   
        
    }, []);

    const handleDeleteChallenge = () => dispatch(challengeDelete(_id))
    
    return (
        <ChallengeCardView
            challenge={{
                _id: _id as string,
                title: title as string,
                details: details as IChallenge["details"],
                preview: preview as string,
            }}
            role={role}
            callbacks={{
                handleChangeCard, 
                handleDeleteChallenge,
                handleSolveChallenge,
            }}
            chapter={chapterName}
            course={course}
            classForCard="challenge-card"
        />
    )
}
