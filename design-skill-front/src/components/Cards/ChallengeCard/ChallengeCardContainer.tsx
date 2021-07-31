import React, {  useContext, useEffect } from 'react';
import './ChallengeCard.style.scss';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/store';
import { 
    saveEditChallengeCard, 
    challengeDelete,
    setChallengeId,
    fetchChallengesByChapterName,
} from '../../../store/reducers/challengesReducer';
import { IChallenge } from '../../../interfaces/challenge.interface';
import { UserRoleContext } from '../../../Context';

import { ChallengeCardView } from './ChallengeCardView';

interface ChallengeRouteParams {
    chapter: string;
}

export default function ChallengeCard({_id}) {
    const role = useContext(UserRoleContext);
    const status = useAppSelector((state) => state.challenges.status);
    const challenges = useAppSelector((state) => state.challenges.challenges)
    console.log('challenges', challenges);
    console.log('status', status)
    
    const challenge = useAppSelector((state) => {
        return state.challenges.challenges.find((challenge: IChallenge) => challenge._id === _id);
    });
    console.log('id in challenge', _id)
    console.log('challenge', challenge);

    const course = useAppSelector((state) => state.chapters.course);
    const { chapter } = useParams<ChallengeRouteParams>();
    const dispatch = useAppDispatch();

    const handleSolveChallenge = () => dispatch(setChallengeId(_id));

    const handleChangeCard = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        dispatch(saveEditChallengeCard({_id, items: [name, value]}));
    }

    const handleDeleteChallenge = () => dispatch(challengeDelete(_id))

    useEffect(() => {
        console.log('chapter', chapter);
        
        dispatch(fetchChallengesByChapterName(chapter))
    }, [dispatch, chapter])
    
    return (
        <>
            {status === 'working' &&
                <ChallengeCardView
                    challenge={challenge}
                    role={role}
                    callbacks={{
                        handleChangeCard, 
                        handleDeleteChallenge,
                        handleSolveChallenge,
                    }}
                    chapter={chapter}
                    course={course}
                    classForCard="challenge-card"
                />
            }
        </>
    )
}
