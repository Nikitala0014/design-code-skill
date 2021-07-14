import React from 'react';
import './SubmissionDetails.scss';

import Editor from '../../../../Editor/Editor'
import { ChallengeCompiler } from '../../../ChallengeCompiler/ChallengeCompiler';

export const SubmissionDetails = ({time, score, status, submitedCode}) => {
    return (
        <section className="submission-details mjb">
            <div className="submission-details-wrapper challenge-bsw">
                <div className="submission-header">
                    <div className="submited-at">
                        Вы отправили это решение {time}
                    </div>
                    <div className="submission-score">
                        <label className="label">Оценка:</label>
                        <span className="value">{score}</span>
                    </div>
                    <div className="status-wrap">
                        <label className="label">Статус:</label>
                        <span className="value error">{status}</span>
                    </div>
                </div>
                <div className="code-block">
                    <h3 className="section-title">Отправленный Код</h3>
                    <div className="code-wrap">
                        <Editor
                            code={submitedCode}
                            lang="javascript"
                        />
                    </div>
                </div>
            </div>
            <ChallengeCompiler
                cases={{
                    case_0: {status: 'error', input: [4, 1, 2, 3], userOutput: '5', expectedOutput: '3'},
                    case_1: {status: 'accepted', input: [24, 2, 89, 3, 5], userOutput: '34', expectedOutput: '45'},
                    case_2: {status: 'accepted', input: [7, 9, 1, 0, 3], userOutput: '12', expectedOutput: '7'}
                }}
            />
        </section>
    )
}