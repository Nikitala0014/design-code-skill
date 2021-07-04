import React from 'react';
import './Challenge.scss';

import ChallengeContent from './ChallengeContent/ChallengeContent';

import { content } from '../../store/reducers/make-do';

const contentProblem = document.createElement('div');
contentProblem.innerHTML = content

export default function Challenge() {
    return (
        <> 
            <header className="challenge-view-header">
                <h1>Header of challenge</h1>
            </header>
            <div className="challenge-view">
                <div className="challenge-page-header container">
                    <div className="ui-tabs-wrap">
                        <div className="render-list">
                            <div className="tab-header" role="navigation">
                                <a href="/" className="tab-item active">
                                    <div className="tab-item-color">
                                        <span className="ui-icon-label">Problem</span>
                                    </div>
                                </a>
                                <a href="/" className="tab-item">
                                    <div className="tab-item-color">
                                        <span className="ui-icon-label">Submissions</span>
                                    </div>
                                </a>
                                <a href="/" className="tab-item">
                                    <div className="tab-item-color">
                                        <span className="ui-icon-label">Editorial</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="challenge-view-problem">
                    <div className="panes-container">
                        <div className="left-pane-challenge">
                            <ChallengeContent>
                                {contentProblem}
                            </ChallengeContent>
                        </div>
                        <div className="right-pane-challenge">
                            <aside className="challenge-sidebar">
                                <div className="challenge-sidebar-container">
                                    <div className="sidebar-problem-difficulty">
                                        <div className="difficulty-block">
                                            <p className="difficulty-label">Author</p>
                                            <div className="ui-tooltip-wrapper">
                                                <a href="/profile/NikitaLa00" className="text-link link-style">
                                                    NikitaLa00
                                                </a>
                                            </div>
                                        </div>
                                        <div className="difficulty-block">
                                            <p className="difficulty-label">Difficulty</p>
                                            <p className="difficulty-medium">Medium</p>
                                        </div>
                                        <div className="difficulty-block">
                                            <p className="difficulty-label">Max Score</p>
                                            <p className="difficulty-score">40</p>
                                        </div>
                                        <div className="difficulty-block">
                                            <p className="difficulty-label">Submitted By</p>
                                            <a href="/challenges/leaderboard" className="text-link">1</a>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
