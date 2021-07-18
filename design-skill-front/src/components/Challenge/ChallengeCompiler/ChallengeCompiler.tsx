import React, { useState } from 'react';
import './ChallengeCompiler.scss';

import { ISubmissionData } from '../ChallengeSections/SubmissionsSection/SubmissionDetails/SubmissionDetails'
import { TestCasesList } from './TestCasesList';
import { TestCasesContent } from './TestCasesContent';

// {status, input, expectedOutput}
export const ChallengeCompiler = (cases: ISubmissionData[]) => {
    const [case_0, case_1, case_2] = [cases[0], cases[1], cases[2]] 
    const [selectedCase, setSelectedCase] = useState('0')
    const caseToView = selectedCase === '0' ? case_0 : selectedCase === '1' ? case_1 : case_2;
    const { status, input, userOutput, expectedOutput } = caseToView;
    const caseStatus_0 = case_0.status === 'error' ? 'tab-item-color-error' : 'tab-item-color-success'; 
    const caseStatus_1 = case_1.status === 'error' ? 'tab-item-color-error' : 'tab-item-color-success'; 
    const caseStatus_2 = case_2.status === 'error' ? 'tab-item-color-error' : 'tab-item-color-success'; 

    return (
        <div className="tc-container">
            <div className="test-cases-result-wrapper flex flex-row">
                <TestCasesList 
                    selectedCase={selectedCase} 
                    setSelectedCase={setSelectedCase}
                    casesStatus={{caseStatus_0, caseStatus_1, caseStatus_2}}
                />
                <TestCasesContent
                    status={status}
                    input={input}
                    userOutput={userOutput}
                    expectedOutput={expectedOutput}
                />
            </div>
        </div>
    )
}