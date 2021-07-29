import React, { useState } from 'react';
import './ChallengeCompiler.scss';

import { ISubmissionData } from '../../../interfaces/challenge.interface';
import { TestCasesList } from './TestCasesList';
import { TestCasesContent } from './TestCasesContent';

export const ChallengeCompiler = ({cases}) => {
    const {case_result_0, case_result_1, case_result_2} = cases; 
    const [selectedCase, setSelectedCase] = useState('0')
    const caseToView = (selectedCase === '0') 
        ? (case_result_0) 
        : (selectedCase === '1' ? case_result_1 : case_result_2);
    const { status, input, result, expected } = caseToView as ISubmissionData["case_result_0"];
    const caseStatus_0 = case_result_0.status === 'Error' ? 'tab-item-color-error' : 'tab-item-color-success'; 
    const caseStatus_1 = case_result_1.status === 'Error' ? 'tab-item-color-error' : 'tab-item-color-success'; 
    const caseStatus_2 = case_result_2.status === 'Error' ? 'tab-item-color-error' : 'tab-item-color-success'; 

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
                    result={result}
                    expected={expected}
                />
            </div>
        </div>
    )
}