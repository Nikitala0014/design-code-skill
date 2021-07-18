import React from 'react';

import './ChallengeNavigation.scss';
import { NavLink, useRouteMatch } from 'react-router-dom';

export const ChallengeNavigation = ({label, selected}) => {
    const { url } = useRouteMatch();
    return (
        <NavLink to={`${url}/${label.toLowerCase()}`} className="tab-item pLL pRL pTM pBM" 
        activeClassName="selected" onClick={() => selected(label)} >
            <div className="tab-item-color">
                <span className="ui-icon-label">{label}</span>
            </div>
        </NavLink>
    )
}