import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './Profile.scss';

import { IChallenge } from '../../interfaces/challenge.interface';
import ChallengeCard from '../Cards/ChallengeCard/ChallengeCardContainer';

import { ProfileView } from './ProfileView';

export default function ProfileContainer() {
    const challengesBookmarked = useSelector((state: RootState) => state.user.challengesBookmarked)
    const challengesSolved = useSelector((state: RootState) => state.user.challengesSolved)
    const challengesAttempted = useSelector((state: RootState) => state.user.challengesAttempted)

    const renderedChallengesBookmarked = challengesBookmarked.map((challenge: IChallenge) => {
        return (
            <ChallengeCard 
                key={challenge._id as string}
                _id={challenge._id as string}
                // classNameChallenge='bookmarked'
            />
        )
    });
    const renderedChallengesSolved = challengesSolved.map((challenge: IChallenge) => {
        return (
            <ChallengeCard 
                key={challenge._id as string}
                _id={challenge._id as string}
                // classNameChallenge='solved'
            />
        )
    });
    const renderedChallengesAttempted = challengesAttempted.map((challenge: IChallenge) => {
        return (
            <ChallengeCard 
                key={challenge._id as string}
                _id={challenge._id as string}
                // classNameChallenge='attempted'
            />
        )
    });
    

    return (
        <>
            <ProfileView 
                challenges={{
                    bookmarked: renderedChallengesBookmarked,
                    solved: renderedChallengesSolved,
                    attemted: renderedChallengesAttempted,
                }}
            />
        </>
    )
}
