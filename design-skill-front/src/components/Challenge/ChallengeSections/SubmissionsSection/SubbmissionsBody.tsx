import React from 'react';

import { TableRow } from './TableRow';
import { IContentSubmission } from '../../../../interfaces/challenge.interface';

export const SubbmissionsBody = ({submissions}) => {
    return (
        <>
            {submissions && submissions.map((submitedCode: IContentSubmission) => {
                const { status, score, date, submitedCodeId } = submitedCode;
                return (
                    <div key={submitedCodeId} className="table-body">
                        <TableRow
                            status={status}
                            score={score}
                            date={date}
                            submitedCodeId={submitedCodeId}
                        />
                    </div>
                )
            })}
            {(!submissions || submissions.length === 0) && <h3 className="pS">Not yet submissions</h3>}
        </>
    )
}
