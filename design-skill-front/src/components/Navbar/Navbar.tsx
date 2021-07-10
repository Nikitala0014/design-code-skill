import React from 'react'
import './Navbar.scss';

export default function Navbar() {
    return (
        <nav className="community-header">
            <div className="nav-container">
                <div className="header-nav-links">
                    <ul className="nav-links">
                        <li className="nav-link-item logo-wrap">
                            <a href="/">
                                <div className="logo-section">
                                    DesignSkillCode 
                                </div>
                            </a>
                        </li>
                        <li className="nav-link-item">
                            <a href="/interview" className="nav-link active">
                                Интервью
                            </a>
                        </li>
                        <li className="nav-link-item">
                            <a href="/" className="nav-link">
                                В процессе
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="profile-menu">
                    <a href="/">Nikita Lavrenov</a>
                </div>
            </div>
        </nav>
    )
}
