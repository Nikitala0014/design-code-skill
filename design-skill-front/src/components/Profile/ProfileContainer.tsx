import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/store';
import './Profile.scss';

import { fetchUserChallenges } from '../../store/reducers/userReducer';
import { ChallengeCardView } from '../Cards/ChallengeCard/ChallengeCardView';
import { IUserChallenge } from '../../interfaces/user.interface';

import { ProfileView } from './ProfileView';

export default function ProfileContainer() {
    const status = useAppSelector((state) => state.user.status)
    const course = useAppSelector((state) => state.chapters.course);
    const userId = useAppSelector((state) => state.user.user._id);
    const challengesSolved = useAppSelector((state) => state.user.challengesSolved)
    const challengesAttempted = useAppSelector((state) => state.user.challengesAttempted)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUserChallenges(userId))
    }, [dispatch, userId])

    const renderedChallengesSolved = challengesSolved.map(
        (userChallenge: IUserChallenge) => {
        return (
            <ChallengeCardView
                key={userChallenge._id as string}
                challenge={userChallenge}
                role='User'
                callbacks={{}}
                chapter={userChallenge.chapterName}
                course={course}
                classForCard="challenge-card"
            />
        )
    });
    const renderedChallengesAttempted = challengesAttempted.map(
            (userChallenge: IUserChallenge) => {
        return (
            <ChallengeCardView
                key={userChallenge._id as string}
                challenge={userChallenge}
                role='User'
                callbacks={{}}
                chapter={userChallenge.chapterName}
                course={course}
                classForCard="challenge-card"
            />
        )
    });
    

    return (
        <>
            <ProfileView 
                challenges={{
                    solved: renderedChallengesSolved,
                    attempted: renderedChallengesAttempted,
                }}
                status={status}
            />
        </>
    )
}
