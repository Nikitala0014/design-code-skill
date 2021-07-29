import React from 'react';
import './Challenge.scss';

import ChallengeContent from './ChallengeContent/ChallengeContent';
import { ChallengeHeader } from './ChallengeHeader/ChallengeHeader';
import { SidebarSection } from './ChallengeSections/SidebarSection';

export default function Challenge() {
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
                            <ChallengeContent/>
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
