import React from 'react';
import { useAppSelector } from '../../../../store/store';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import './SubmissionsSection.scss';

import { SubmissionsHeader } from './SubmissionsHeader';
import { SubbmissionsBody } from './SubbmissionsBody';
import { SubmissionDetails } from './SubmissionDetails/SubmissionDetails';

export const SubmissionsSection = ({challenge}) => {
    let { path } = useRouteMatch(); 
    const userId = useAppSelector((state) => state.user.user._id);
    const submitedCodeList = challenge.challengeCodeSubmissions?.filter((submission) => {
        return submission.userId === userId;
    })
    console.log('submited list: ', submitedCodeList);
    

    return (
        <section className="challenge-submissions-section">
            <Switch>
                <Route exact path={path}>
                    <div className="general-table-wrap challenge-bsw">
                        <SubmissionsHeader />
                        <SubbmissionsBody
                            submissions={submitedCodeList}
                        />
                    </div>
                </Route>
                <Route exact path={`${path}/code/:codeId`}>
                    <SubmissionDetails
                        submissions={submitedCodeList}
                    />
                </Route>
            </Switch>
        </section>
    )
}
