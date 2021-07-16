import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import './SubmissionsSection.scss';

import { ISubmitedCode } from '../../../../interfaces/challenge.interface';
import { SubmissionsHeader } from './SubmissionsHeader';
import { SubbmissionsBody } from './SubbmissionsBody';
import { SubmissionDetails } from './SubmissionDetails/SubmissionDetails';
import { code } from '../../../../store/reducers/make-do';

export const SubmissionsSection = () => {
    let { path } = useRouteMatch();
    const submitedCodeList: ISubmitedCode[] = [
        {status: 'error', score: 0.0, time: "9 days ago", submitedCodeId: "102345"},
        {status: 'accepted', score: 20.0, time: "one year ago", submitedCodeId: "734970"},
    ];

    return (
        <section className="challenge-submissions-section">
            <Switch>
                <Route exact path={path}>
                    <div className="general-table-wrap challenge-bsw">
                        <SubmissionsHeader />
                        <SubbmissionsBody {...submitedCodeList}
                        />
                    </div>
                </Route>
                <Route exact path={`${path}/code/:codeId`}>
                    <SubmissionDetails
                        time="9 дней назад"
                        score="0.0"
                        status="Wrong Answer"
                        submitedCode={code}
                        submissionData={[
                            {status: 'error', input: [4, 1, 2, 3], userOutput: '5', expectedOutput: '3'},
                            {status: 'accepted', input: [24, 2, 89, 3, 5], userOutput: '34', expectedOutput: '45'},
                            {status: 'accepted', input: [7, 9, 1, 0, 3], userOutput: '12', expectedOutput: '7'}
                        ]}
                    />
                </Route>
            </Switch>
        </section>
    )
}
