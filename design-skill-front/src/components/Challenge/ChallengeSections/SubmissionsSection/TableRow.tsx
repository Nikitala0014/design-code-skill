import { NavLink, useRouteMatch } from 'react-router-dom';

export const TableRow = ({status, score, time, submitedCodeId}) => {
    const { url } = useRouteMatch();
    
    return (
        <div className="table-row-wrapper pLL pRL">
            <div className="table-row flex">
                <div className="table-row-column ellipsis result">
                    <div className={`ellipsisi ${status === 'error' 
                            ? 'status-error' : 'status-accepted'}`}>
                        <span className="ui-cross">
                            {status === 'error' ? 'Wrong Answer' : 'Accepted'}
                        </span>
                    </div>
                </div>
                <div className="table-row-column ellipsis score">
                    <div className="ellipsis submission-score">{score}</div>
                </div>
                <div className="table-row-column ellipsis time">
                    <div className="ellipsis submission-time">{time}</div>
                </div>
                <div className="table-row-column ellipsis view-results">
                    <div className="ellipsis submission-result">
                        <NavLink to={`${url}/code/${submitedCodeId}`} className="text-link">
                            View Result
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}