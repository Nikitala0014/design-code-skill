import React, { useState } from 'react';
import './Landing.scss';
import { 
    NavLink, 
    useRouteMatch, 
    Switch, 
    Route 
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {createAnAccount, logInAccount} from '../../store/reducers/userReducer';

export default function Landing() {
    const { url, path } = useRouteMatch()
    const status = useAppSelector((state) => state.user.status);
    const errorMessage = useAppSelector((state) => state.user.errorMessage)
    const [usernameSign, setUserNameSign] = useState('');
    const [passwordSign, setPasswordSign] = useState('');
    const [usernameLog, setUserNameLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');
    const dispatch = useAppDispatch();

    const handleSignUp = () => {
        dispatch(createAnAccount({_username: usernameSign, _password: passwordSign, _role: 'User'}))
    }
    const handleLogIn = () => {
        dispatch(logInAccount({_username: usernameLog, _password: passwordLog}))
    }

    return (
        <div className="landing-page flex flex-column">
            <section className="landing-section-nav flex flex-row">
                <NavLink 
                    className="landing-link" 
                    to={`${url}/sign_up`}>
                        Sign up
                </NavLink>
                <NavLink 
                    className="landing-link" 
                    to={`${url}/log_in`}>
                        Log in
                </NavLink>
            </section>
            <section className="landing-section-content">
                <Switch>
                    <Route exact path={`${path}/sign_up`}>
                        <div className="landing-form flex flex-column">
                            <label className="label-sign-form mBL">
                                <input 
                                    type="text"
                                    placeholder="Username"
                                    value={usernameSign}
                                    onChange={(e) => setUserNameSign(e.target.value)} 
                                />
                            </label>
                            <label className="label-sign-form mBL">
                                <input 
                                    type="text"
                                    placeholder="Password"
                                    value={passwordSign}
                                    onChange={(e) => setPasswordSign(e.target.value)}
                                />
                            </label>
                            <button className="landing-btn-form" onClick={handleSignUp}>
                                Create An Account
                            </button>
                        </div>
                    </Route>
                    <Route exact path={`${path}/log_in`}>
                        <div className="landing-form flex flex-column">
                            <span className="error message mBL">
                                {status === 'failed' && errorMessage}
                            </span>
                            <label className="label-log-form mBL">
                                <input 
                                    type="text"
                                    placeholder="Username"
                                    value={usernameLog}
                                    onChange={(e) => setUserNameLog(e.target.value)} 
                                />
                            </label>
                            <label className="label-log-form mBL">
                                <input 
                                    type="text"
                                    placeholder="Password"
                                    value={passwordLog}
                                    onChange={(e) => setPasswordLog(e.target.value)}
                                />
                            </label>
                            <button className="landing-btn-form btn-form" onClick={handleLogIn}>
                                Log in
                            </button>
                        </div>
                    </Route>
                </Switch>
            </section>
        </div>
    )
}
