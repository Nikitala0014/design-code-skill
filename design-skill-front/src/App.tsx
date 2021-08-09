import React, { useEffect } from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';

import { Preloader } from './components/Preloader/Preloader';
import { LandingApp } from './components/LandingApp/LandingApp';
import Landing from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import Chapters from './components/Chapters/ChaptersContainer';
import Challenges from './components/Challenges/ChallengesContainer';
import Challenge from './components/Challenge/Challenge';
import Profile from './components/Profile/ProfileContainer';
import { useAppSelector, useAppDispatch } from './store/store';
import { isLogin } from './store/reducers/userReducer';

import { UserRoleContext } from './Context';

function App() {
  const status = useAppSelector((state) => state.user.status);
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const userRole = useAppSelector((state) => state.user.user.role);  
  const course = useAppSelector((state) => state.chapters.course);
  const dispath = useAppDispatch();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  console.log('domain', domain);
  console.log('clientId', clientId);
  console.log('process', process.env)

  useEffect(() => {
    dispath(isLogin())
  }, [dispath])
  
  return (
      <UserRoleContext.Provider value={userRole}>
          <div className="app theme-grey">
            <Navbar />
            {status === 'loading' ? <Preloader /> :
              <Switch>
                <Route exact path='/landing_app'>
                  <LandingApp />
                </Route>
                <Route exact path={`/`}>
                  <Profile />
                </Route>
                <Route path={'/landing'}>
                  { loggedIn ? <Redirect to='/' /> : <Landing /> }
                </Route>
                <Route exact path={`/${course}`}>
                  { loggedIn ? <Chapters /> : <Redirect to='/landing/log_in' />}
                </Route>
                <Route exact path={`/${course}/:chapter/challenges`}>
                  { true ? <Challenges /> : <Redirect to='/landing/log_in' />}
                </Route>
                <Route path={`/${course}/:chapter/challenges/:challenge_`}>
                { true ? <Challenge /> : <Redirect to='/landing/log_in' />}
                </Route>
            </Switch>
            }
          </div>
      </UserRoleContext.Provider>
  );
}

export default App;
