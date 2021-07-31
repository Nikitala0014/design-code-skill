import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Challenge.scss';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchChallengesByChapterName } from '../../store/reducers/challengesReducer';
import ChallengeContent from './ChallengeContent/ChallengeContent';
import { ChallengeHeader } from './ChallengeHeader/ChallengeHeader';
import { SidebarSection } from './ChallengeSections/SidebarSection';

interface ChallengeRouteParams {
    chapter: string;
    challenge_: string;
}

export default function Challenge() {
    const status = useAppSelector((state) => state.challenges.status)
    const { chapter, challenge_ } = useParams<ChallengeRouteParams>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchChallengesByChapterName(chapter))
    }, [dispatch, chapter])

    return (
        <div className="theme-grey"> 
            <header className="challenge-view-header">
                <h1>Header of challenge</h1>
            </header>
            <div className="container"></div>
            <div className="challenge-view">
                <ChallengeHeader />
                <section className="challenge-view-problem">
                    <div className="panes-container flex flex-row pMHR pMHL">
                        <div className="left-pane-challenge">
                            {status === 'loading' ? <span>Loading</span> :
                            <ChallengeContent challengeName={challenge_} />
                            }
                        </div>
                        <div className="right-pane-challenge mML mLL">
                            <aside className="challenge-sidebar">
                                <div className="challenge-sidebar-container">
                                    <SidebarSection
                                        username="NikitaLa00"
                                        diff="medium"
                                        score="40"
                                    />
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
