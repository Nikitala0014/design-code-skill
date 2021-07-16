import React from 'react'

import { TableRow } from './TableRow';
import { ISubmitedCode } from '../../../../interfaces/challenge.interface';

export const SubbmissionsBody = (submitedCodeList: ISubmitedCode[]=[]) => {
    console.log('sub', submitedCodeList);
    
    
    return (
        <>
            {submitedCodeList.map((submitedCode: ISubmitedCode) => {
                const { status, score, time, submitedCodeId } = submitedCode;
                return (
                    <div className="table-body">
                        <TableRow
                            status={status}
                            score={score}
                            time={time}
                            submitedCodeId={submitedCodeId}
                        />
                    </div>
                )
            })}
        </>
        // <div className="table-body">
        //     <TableRow 
        //         status="error"
        //         score="0.0"
        //         time="9 days ago"
        //         submitedCodeId="102345"
        //     />
        //     <TableRow 
        //         status="accepted"
        //         score="20.0"
        //         time="one year ago"
        //         submitedCodeId="734970"
        //     />
        // </div>
    )
}
