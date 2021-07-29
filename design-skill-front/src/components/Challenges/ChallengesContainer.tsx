import React from 'react';
import './Challenges.style.scss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from '../../store/store';
import { IChallenge } from '../../interfaces/challenge.interface';
import ChallengeCard from '../Cards/ChallengeCard/ChallengeCardContainer';

import { ChallengesView } from './ChallengesView';

interface ChallengeRouteParams {
    title: string
}

export default function Challenges() {
    //context
    const role = useSelector((state: RootState) => state.user.user.role);
    const {title} = useParams<ChallengeRouteParams>();
    const challenges: IChallenge[] = useSelector((state: RootState) => state.challenges.challenges)

    const handleChangeStatus = (e) => e.target.value;
    const handleChangeDifficulty = (e) => e.target.value;

    const renderedChallengeCards = challenges && challenges.map((challenge: IChallenge) => {
        return (
            <ChallengeCard 
                key={challenge._id as string}
                _id={challenge._id as string}
            />
        )
    })
    
    return <ChallengesView
        title={title}
        renderedChallengeCards={renderedChallengeCards}
        callbacks={{handleChangeStatus, handleChangeDifficulty}}
        role={role}
    />
}
