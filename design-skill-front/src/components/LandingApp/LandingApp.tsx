import React from 'react';
import './LandingApp.scss';
import { useAuth0 } from '@auth0/auth0-react';

import cuote from '../../assets/Coding-cuate.svg'

export const LandingApp = () => {
    const { loginWithRedirect, logout } = useAuth0();
    const useAuthHook = useAuth0();
    console.log('use auth hook', useAuthHook);

    return (
        <div className="landing-app-wrapper flex flex-row">
            <img src={cuote} alt="cuate-coding" />
            <div className="landing-app__forms">
                <button onClick={() => loginWithRedirect()}>Log in</button>
                <button onClick={() => logout()}>Log out</button>
            </div>
        </div>
    )
}