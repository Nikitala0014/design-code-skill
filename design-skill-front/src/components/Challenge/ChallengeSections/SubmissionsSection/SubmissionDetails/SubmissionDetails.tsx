import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import './SubmissionDetails.scss';

import { IContentSubmission } from '../../../../../interfaces/challenge.interface';
import Editor from '../../../../Editor/Editor'
import { ChallengeCompiler } from '../../../ChallengeCompiler/ChallengeCompiler';

interface SubmissionCodeIdRouteParams {
    codeId: string
}

export const SubmissionDetails = ({submissions}) => {
    const { codeId } = useParams<SubmissionCodeIdRouteParams>();
    const contentSubmission = (submissions as IContentSubmission[])
    ?.find((submission) => submission.submitedCodeId === codeId)
    const { date, score, status, submissionDetails } = contentSubmission as IContentSubmission;
    const detailsRef = useRef('');
    const dateSubmited = new Date(date); 
    const dateToView = `${dateSubmited.getUTCDate()}.${(dateSubmited.getUTCMonth() + 1) < 10 && 0}${dateSubmited.getUTCMonth() + 1}.${dateSubmited.getFullYear()}`

    

    return (
        <section className="submission-details mBL">
            <div className="submission-details-wrapper challenge-bsw pL">
                <div className="submission-header">
                    <div className="submited-at mBS">
                        Вы отправили это решение {dateToView}
                    </div>
                    <div className="submission-score mMHR">
                        <label className="label">Оценка:</label>
                        <span className="value">{score}</span>
                    </div>
                    <div className="status-wrap mMHR">
                        <label className="label">Статус:</label>
                        <span 
                            className={`value ${status === 'Error' 
                                ? 'error' : 'accepted'}`
                            }>
                                {status}
                        </span>
                    </div>
                </div>
                <div className="code-block mTL">
                    <h3 className="section-title">Отправленный Код</h3>
                    <div className="code-wrap">
                        <Editor
                            code={submissionDetails.submitedCode}
                            lang="javascript"
                            sectionRef={detailsRef}
                        />
                    </div>
                </div>
            </div>
            <ChallengeCompiler
                cases={submissionDetails.submissionData}
            />
        </section>
    )
}