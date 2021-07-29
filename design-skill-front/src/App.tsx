import React from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';

import Landing from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import Chapters from './components/Chapters/ChaptersContainer';
import Challenges from './components/Challenges/ChallengesContainer';
import Challenge from './components/Challenge/Challenge';
import Profile from './components/Profile/ProfileContainer';
import { useAppSelector } from './store/store';

import { UserRoleContext } from './Context';

function App() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn);
  const error = useAppSelector((state) => state.user.errorMessage);
  const status = useAppSelector((state) => state.user.status);
  const userRole = useAppSelector((state) => state.user.user.role);
  console.log('user role', userRole);
  console.log('logged', loggedIn);
  console.log('error', error);
  console.log('status', status);
  
  
  
  const course = useAppSelector((state) => state.chapters.course);
  
  return (
    <UserRoleContext.Provider value={userRole}>
        <div className="app">
          <Navbar />
          <Switch>
            <Route exact path={`/`}>
              <Profile />
            </Route>
            <Route path={'/landing'}>
              {loggedIn ? <Redirect to='/' /> : <Landing />}
            </Route>
            <Route exact path={`/${course}`}>
              <Chapters />
            </Route>
            <Route exact path={`/${course}/:chapter/challenges`}>
              <Challenges />
            </Route>
            <Route path={`/${course}/:chapter/challenges/:content`}>
              <Challenge />
            </Route>
          </Switch>
        </div>
    </UserRoleContext.Provider>
  );
}

export default App;
