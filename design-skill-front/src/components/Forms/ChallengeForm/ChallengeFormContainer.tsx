import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch, RootState, } from '../../../store/store';

import { IChallenge } from '../../../interfaces/challenge.interface';
import { ChallengeCardView } from '../../Cards/ChallengeCard/ChallengeCardView';
import { saveNewChallenge } from '../../../store/reducers/challengesReducer';

interface ChallengeRouteParams {
    chapterName: string;
}

export const ChallengeForm = () => {
    const role = useAppSelector((state: RootState) => state.user.user.role);
    // context
    const chapterId = useAppSelector((state: RootState) => state.challenges.chapterId);
    const [title, setTitle] = useState('Challenge Name');
    const [details, setDetails] = useState({
        difficulty: 'Hard',
        skill: 'Intermediate',
        maxScore: '20.00',
        successRatio: '34.76'
    });
    const [preview, setPreview] = useState('Enter here short preview for this challenge');
    const dispatch = useAppDispatch();
    const { chapterName } = useParams<ChallengeRouteParams>();

    const handleAddChallenge = async () => {
        await dispatch(saveNewChallenge({
            chapterId: chapterId,
            chapterName: chapterName.toLocaleLowerCase(),
            title: title,
            status: 'unsolved',
            details: {
                difficulty: details.difficulty,
                skill: details.skill,
                maxScore: details.maxScore,
                successRatio: details.successRatio,
            },
            content: {
                contentProblem: '',
                contentCode: {
                    code: '',
                    cases: {
                        case_0: {input: '', expectedOutput: '0'},
                        case_1: {input: '', expectedOutput: '0'},
                        case_2: {input: '', expectedOutput: '0'},
                    }
                },
                contentEditorial: ''
            },
            preview: preview as string,
            challengeCodeSubmissions: [],
        } as IChallenge));
        setTitle('Challenge Name');
        setDetails({
            difficulty: 'Hard',
            skill: 'Intermediate',
            maxScore: '20.00',
            successRatio: '34.76'
        });
        setPreview('Enter here short preview for this challenge');
    }

    const handleChangeCard = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'challenge-title':
                setTitle(value);
                break;
            case 'challenge-difficulty':
                setDetails({...details, difficulty: value});
                break;
            case 'challenge-skill':
                setDetails({...details, skill: value});
                break;
            case 'challenge-maxScore':
                setDetails({...details, maxScore: value});
                break;
            case 'challenge-successRatio':
                setDetails({...details, successRatio: value});
                break;
            case 'challenge-preview':
                setPreview(value);
                break;
            default:
                break;
        }
    }

    return (
        <ChallengeCardView
            challenge={{
                _id: '0',
                title: title,
                details: details,
                preview: preview,
            }}
            role={role}
            callbacks={{
                handleChangeCard,
                handleAddChallenge,
            }}
            chapter={chapterName}
            course="interview"
            classForCard="challenge-card-form-to-add"
        />
    )
}
