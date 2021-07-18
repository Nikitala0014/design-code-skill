import React from 'react';
import './SubmissionDetails.scss';

import Editor from '../../../../Editor/Editor'
import { ChallengeCompiler } from '../../../ChallengeCompiler/ChallengeCompiler';

export interface ISubmissionData {
    status: string;
    input: number[];
    userOutput: string;
    expectedOutput: string;
}

interface ISubmissionDetails {
    time: string;
    score: string;
    status: string;
    submitedCode: string;
    submissionData: ISubmissionData[];
}

export const SubmissionDetails = ({
    time, score, status, submitedCode, submissionData
}: ISubmissionDetails) => {
    return (
        <section className="submission-details mBL">
            <div className="submission-details-wrapper challenge-bsw pL">
                <div className="submission-header">
                    <div className="submited-at mBS">
                        Вы отправили это решение {time}
                    </div>
                    <div className="submission-score mMHR">
                        <label className="label">Оценка:</label>
                        <span className="value">{score}</span>
                    </div>
                    <div className="status-wrap mMHR">
                        <label className="label">Статус:</label>
                        <span className="value error">{status}</span>
                    </div>
                </div>
                <div className="code-block mTL">
                    <h3 className="section-title">Отправленный Код</h3>
                    <div className="code-wrap">
                        <Editor
                            code={submitedCode}
                            lang="javascript"
                        />
                    </div>
                </div>
            </div>
            <ChallengeCompiler {...submissionData}/>
        </section>
    )
}