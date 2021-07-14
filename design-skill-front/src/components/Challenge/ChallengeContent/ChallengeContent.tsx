import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import './ChallengeContent.scss';

import Editor from '../../Editor/Editor';
import { ProblemSection } from '../ChallengeSections/ProblemSection';
import { EditorSection } from '../ChallengeSections/EditorSection';
import { SubmissionsSection } from '../ChallengeSections/SubmissionsSection/SubmissionsSection';
import { EditorialSection } from '../ChallengeSections/EditorialSection';

import { code } from '../../../store/reducers/make-do';

export default function ChallengeContent({problem, editorial}) {
    const { isEditProblem, childrenProblem } = problem;
    const { isEditEditorial, childrenEditorial } = editorial;
    const contentProblem = document.createElement('div');
    contentProblem.innerHTML = childrenProblem
    const contentEditorial = document.createElement('div');
    contentEditorial.innerHTML = childrenEditorial;

    const { path } = useRouteMatch();

    // function handleSubmit() {
    //     console.log('submit code state');
    // }
    

    return (
        <>
            <Switch>
                <Route exact path={`/interview/:chapter/challenges/:content/problem`}>
                    <ProblemSection
                        isEdit={isEditProblem}
                        children={childrenProblem}
                        content={contentProblem}
                        Editor={Editor}
                    />
                    <EditorSection
                        code={code}
                        Editor={Editor}
                    />
                </Route>
                <Route path={`${path}/submissions`}>
                    <SubmissionsSection />
                </Route>
                <Route path={`/interview/:chapter/challenges/:content/editorial`}>
                    <EditorialSection
                        isEdit={isEditEditorial}
                        children={childrenEditorial}
                        content={contentEditorial}
                        Editor={Editor}
                    />
                </Route>
            </Switch>
        </>
    )
}
