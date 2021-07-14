import React from 'react';

export const SubmissionsHeader = () => {
    return (
        <div className="table-header-wrapper">
            <header className="table-header flex">
                <div className="table-header-column result">
                    <div className="ellipsis">Результат</div>
                </div>
                <div className="table-header-column score">
                    <div className="ellipsis">Оценка</div>
                </div>
                <div className="table-header-column time">
                    <div className="ellipsis">Дата</div>
                </div>
                <div className="table-header-column view-results">
                    <div className="ellipsis"></div>
                </div>
            </header>
        </div>
    )
}