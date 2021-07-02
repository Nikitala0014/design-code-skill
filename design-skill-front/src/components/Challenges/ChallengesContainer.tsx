import React from 'react';
import './Challenges.style.scss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState, useAppDispatch } from '../../redux/store';
import { IChallenge } from '../../interfaces/challenge.interface';
import ChallengeCard from '../Cards/ChallengeCard/ChallengeCardContainer';
import {
    newStatusFilter,
    newDifficultyFilter,
} from '../../redux/reducers/challengesReducer';

import { ChallengesView } from './ChallengesView';

interface ChallengeRouteParams {
    title: string
}

export default function Challenges() {
    const role = useSelector((state: RootState) => state.chapters.role);
    const {title} = useParams<ChallengeRouteParams>();
    const statusFilter = useSelector((state: RootState) => state.challenges.filters.status);
    // const difficultyFilter = useSelector((state: RootState) => state.challenges.filters.difficulty);
    const dispatch = useAppDispatch();
    const challenges: IChallenge[] = useSelector((state: RootState) => {
        const challenges = state.challenges.challenges;
        const filteredChallenges = challenges.filter((challenge: IChallenge) => challenge.status === statusFilter )
        return filteredChallenges
    })
    

    const handleChangeStatus = (e) => dispatch(newStatusFilter(e.target.value));
    const handleChangeDifficulty = (e) => dispatch(newDifficultyFilter(e.target.value));

    const challengesForUser = challenges.filter((challenge) => challenge._id !== 'newChallenge');
    const rightChallenges = role === 'User' ? challengesForUser : challenges;

    const renderedChallengeCards = rightChallenges.map((challenge: IChallenge) => {
        return (
            <ChallengeCard 
                key={challenge._id as string}
                _id={challenge._id as string}
                route={challenge.route as string}
                classNameChallenge={
                    challenge._id === 'newChallenge' ? 'new-challenge-card' : 'challenge-card'
                }
            />
        )
    } )

    return <ChallengesView
        title={title}
        renderedChallengeCards={renderedChallengeCards}
        callbacks={{handleChangeStatus, handleChangeDifficulty}}
    />
}
