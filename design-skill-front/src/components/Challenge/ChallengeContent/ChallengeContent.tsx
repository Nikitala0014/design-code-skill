import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useAppSelector } from '../../../store/store';

import './ChallengeContent.scss';

import { IChallenge } from '../../../interfaces/challenge.interface';
import { ProblemSection } from '../ChallengeSections/ProblemSection';
import { EditorSection } from '../ChallengeSections/EditorSection';
import { SubmissionsSection } from '../ChallengeSections/SubmissionsSection/SubmissionsSection';
import { EditorialSection } from '../ChallengeSections/EditorialSection';

export default function ChallengeContent() {
    const challengeId = useAppSelector((state) => state.challenges.challengeId);
    const challenge = useAppSelector((state) => 
        state.challenges.challenges.find((challenge) => challenge._id === challengeId)
    );
    
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
                <Route exact path={`/interview/:chapter/challenges/:content/problem`}>
                    <ProblemSection
                        children={contentProblem}
                        content={problemElement}
                        challengeId={challengeId}
                    />
                    <EditorSection
                        challengeId={challengeId}
                        contentCode={contentCode}
                        codeSubmissions={challenge?.challengeCodeSubmissions}
                    />
                </Route>
                <Route path={`${path}/submissions`}>
                    <SubmissionsSection />
                </Route>
                <Route path={`/interview/:chapter/challenges/:content/editorial`}>
                    <EditorialSection
                        children={contentEditorial}
                        content={editorialElement}
                        challengeId={challengeId}
                    />
                </Route>
            </Switch>
        </>
    )
}
