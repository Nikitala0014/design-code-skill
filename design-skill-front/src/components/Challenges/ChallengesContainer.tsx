import React, { useEffect, useContext } from 'react';
import './Challenges.style.scss';
import { useParams } from 'react-router-dom';

import { useAppSelector, useAppDispatch } from '../../store/store';
import { fetchChallengesByChapterName } from '../../store/reducers/challengesReducer';
import { IChallenge } from '../../interfaces/challenge.interface';
import ChallengeCard from '../Cards/ChallengeCard/ChallengeCardContainer';
import { UserRoleContext } from '../../Context';

import { ChallengesView } from './ChallengesView';

interface ChallengesRouteParams {
    chapter: string
}

export default function Challenges() {
    const role = useContext(UserRoleContext);
    let { chapter } = useParams<ChallengesRouteParams>();
    const challenges = useAppSelector((state) => state.challenges.challenges)
    const status = useAppSelector((state) => state.challenges.status);
    const dispatch = useAppDispatch();

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

    useEffect(() => {
        dispatch(fetchChallengesByChapterName(chapter))
    }, [dispatch, chapter])
    
    return <ChallengesView
        title={chapter}
        renderedChallengeCards={renderedChallengeCards}
        callbacks={{handleChangeStatus, handleChangeDifficulty}}
        role={role}
        status={status}
    />
}
