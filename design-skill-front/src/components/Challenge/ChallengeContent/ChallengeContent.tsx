import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';

import './ChallengeContent.scss';

import { IChallenge } from '../../../interfaces/challenge.interface';
import { ProblemSection } from '../ChallengeSections/ProblemSection';
import { EditorSection } from '../ChallengeSections/EditorSection';
import { SubmissionsSection } from '../ChallengeSections/SubmissionsSection/SubmissionsSection';
import { EditorialSection } from '../ChallengeSections/EditorialSection';

export default function ChallengeContent({challengeName}) {
    const challenge = useAppSelector((state) => 
        state.challenges.challenges.find((challenge) => challenge.title === challengeName)
    );
    const { _id } = challenge as IChallenge;
    
    const { 
        contentProblem, 
        contentCode, 
        contentEditorial,
    } = challenge?.content as IChallenge["content"];
    const { path } = useRouteMatch();
    
    const problemElement = document.createElement('div');
    const editorialElement = document.createElement('div');
    problemElement.innerHTML = contentProblem;
    editorialElement.innerHTML = contentEditorial;

    return (
        <>
            <Switch>
                <Route exact path={`/interview/:chapter/challenges/:challenge_/problem`}>
                    <ProblemSection
                        children={contentProblem}
                        content={problemElement}
                        challengeId={_id}
                    />
                    <EditorSection
                        challengeId={_id}
                        contentCode={contentCode}
                        codeSubmissions={challenge?.challengeCodeSubmissions}
                    />
                </Route>
                <Route path={`${path}/submissions`}>
                    <SubmissionsSection challenge={challenge}/>
                </Route>
                <Route path={`/interview/:chapter/challenges/:challenge_/editorial`}>
                    <EditorialSection
                        children={contentEditorial}
                        content={editorialElement}
                        challengeId={_id}
                    />
                </Route>
            </Switch>
        </>
    )
}
