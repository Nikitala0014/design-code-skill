import React from 'react'

import { TableRow } from './TableRow';

export const SubbmissionsBody = () => {
    return (
        <div className="table-body">
            <TableRow 
                status="error"
                score="0.0"
                time="9 days ago"
                codeId="102345"
            />
            <TableRow 
                status="accepted"
                score="20.0"
                time="one year ago"
                codeId="734970"
            />
        </div>
    )
}
