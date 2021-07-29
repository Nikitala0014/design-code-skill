import { NavLink, useRouteMatch } from 'react-router-dom';

export const TableRow = ({status, score, date, submitedCodeId}) => {
    const { url } = useRouteMatch();
    const dateSubmited = new Date(date); 
    const dateToView = `${dateSubmited.getUTCDate()}.${(dateSubmited.getUTCMonth() + 1) < 10 && 0}${dateSubmited.getUTCMonth() + 1}.${dateSubmited.getFullYear()}`
    
    return (
        <div className="table-row-wrapper pLL pRL">
            <div className="table-row flex">
                <div className="table-row-column ellipsis result">
                    <div className={`ellipsisi ${status === 'Error' 
                            ? 'status-error' : 'status-accepted'}`}>
                        <span className="ui-cross">
                            {status === 'Error' ? 'Wrong Answer' : 'Accepted'}
                        </span>
                    </div>
                </div>
                <div className="table-row-column ellipsis score">
                    <div className="ellipsis submission-score">{score}</div>
                </div>
                <div className="table-row-column ellipsis time">
                    <div className="ellipsis submission-time">
                        {dateToView}
                    </div>
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