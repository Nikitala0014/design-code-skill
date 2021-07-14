import './App.scss';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Chapters from './components/Chapters/ChaptersContainer';
import Challenges from './components/Challenges/ChallengesContainer';
import Challenge from './components/Challenge/Challenge';
import Profile from './components/Profile/ProfileContainer';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

function App() {
  const course = useSelector((state: RootState) => state.chapters.course);
  
  return (
    <div className="app">
      <Navbar />
      <Switch>
        <Route exact path={`/`}>
          <Profile />
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
  );
}

export default App;
