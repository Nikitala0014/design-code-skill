import React from 'react';

export const TestCasesList = ({selectedCase, setSelectedCase, casesStatus}) => {
    const { caseStatus_0, caseStatus_1, caseStatus_2 } = casesStatus;

    return (
        <div className="render-list-cases flex flex-wrap">
            <div className="tab-header-cases flex flex-column" role="tablist">
                <button 
                    className={`tab-item-cases ${selectedCase === '0' && 'selected'}`} 
                    onClick={() => setSelectedCase('0')}>
                    <div className={`testcase-tab-item ${caseStatus_0} flex`}>
                        <span className="tab-item-label">Sample test case 0</span>
                    </div>
                </button>
                <button 
                    className={`tab-item-cases ${selectedCase === '1' && 'selected'}`}
                    onClick={() => setSelectedCase('1')}>
                    <div className={`testcase-tab-item ${caseStatus_1}`}>
                        <span className="tab-item-label">Sample test case 1</span>
                    </div>
                </button>
                <button 
                    className={`tab-item-cases ${selectedCase === '2' && 'selected'}`}
                    onClick={() => setSelectedCase('2')}>
                    <div className={`testcase-tab-item ${caseStatus_2}`}>
                        <span className="tab-item-label">Sample test case 2</span>
                    </div>
                </button>
            </div>
        </div>
    )
}