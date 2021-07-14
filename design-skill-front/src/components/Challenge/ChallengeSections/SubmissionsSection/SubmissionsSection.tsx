import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import './SubmissionsSection.scss';

import { SubmissionsHeader } from './SubmissionsHeader';
import { SubbmissionsBody } from './SubbmissionsBody';
import { SubmissionDetails } from './SubmissionDetails/SubmissionDetails';
import { code } from '../../../../store/reducers/make-do';

export const SubmissionsSection = () => {
    let { path } = useRouteMatch();
    console.log('path', `${path}/code/:codeId`);
    
    return (
        <section className="challenge-submissions-section">
            <Switch>
                <Route exact path={path}>
                    <div className="general-table-wrap challenge-bsw">
                        <SubmissionsHeader />
                        <SubbmissionsBody />
                    </div>
                </Route>
                <Route exact path={`${path}/code/:codeId`}>
                    <SubmissionDetails
                        time="9 дней назад"
                        score="0.0"
                        status="Wrong Answer"
                        submitedCode={code}
                    />
                </Route>
            </Switch>
        </section>
    )
}
