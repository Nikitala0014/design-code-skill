import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import './Challenge.scss';

import ChallengeContent from './ChallengeContent/ChallengeContent';
import { ChallengeHeader } from './ChallengeHeader/ChallengeHeader';
import { SidebarProblem } from './SidebarProblem';

import { childrenProblem, childrenEditorial } from '../../store/reducers/make-do';

export default function Challenge() {
    const [isEditProblem, setEditProblem] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isEditEditorial, setEditEditorial] = useState(false);
    const role = useSelector((state: RootState) => state.user.role);

    return (
        <> 
            <header className="challenge-view-header">
                <h1>Header of challenge</h1>
            </header>
            <div className="challenge-view">
                <ChallengeHeader 
                    problem={{isEditProblem, setEditProblem}} 
                    editorial={{isEditEditorial, setEditEditorial}}
                    role={role} />
                <section className="challenge-view-problem">
                    <div className="panes-container">
                        <div className="left-pane-challenge">
                            <ChallengeContent 
                                problem={{isEditProblem, childrenProblem}}
                                editorial={{isEditEditorial, childrenEditorial}}
                            />
                        </div>
                        <div className="right-pane-challenge">
                            <aside className="challenge-sidebar">
                                <div className="challenge-sidebar-container">
                                    <SidebarProblem
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
        </>
    )
}
