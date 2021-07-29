import React from 'react';
import './ChallengeHeader.scss';
import { ChallengeNavigation } from '../ChallengeNavigation/ChallengeNavigation';

export const ChallengeHeader = () => {
    return (
        <div className="challenge-page-header container pMHR pMHL">
            <div className="ui-tabs-wrap flex flex-row flex-between">
                <div className="render-list flex flex-wrap">
                    <div className="tab-header flex flex-row" role="navigation">
                        <ChallengeNavigation label="Problem" />
                        <ChallengeNavigation label="Submissions" />
                        <ChallengeNavigation label="Editorial" />
                    </div>
                </div>
            </div>
        </div>
    )
}
