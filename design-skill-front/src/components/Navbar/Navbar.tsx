import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';
import { useAppSelector } from '../../store/store';

export default function Navbar() {
    const loggedIn = useAppSelector((state) => state.user.loggedIn)
    return (
        <nav className="community-header">
            <div className="nav-container flex flex-between">
                <div className="header-nav-links">
                    <ul className="nav-links flex">
                        <li className="nav-link-item logo-wrap">
                            <NavLink to="/">
                                <div className="logo-section">
                                    DesignSkillCode 
                                </div>
                            </NavLink>
                        </li>
                        <li className="nav-link-item">
                            <NavLink to="/interview" className="nav-link">
                                Интервью
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="profile-menu flex flex-row">
                    { loggedIn ? <NavLink to="/">Nikita Lavrenov</NavLink> 
                        : <div className='nav-link'>Log in</div>
                    }
                </div>
            </div>
        </nav>
    )
}
