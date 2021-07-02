import './App.scss';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Chapters from './components/Chapters/ChaptersContainer';
import Challenges from './components/Challenges/ChallengesContainer';
import Challenge from './components/Challenge/Challenge';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

function App() {
  const course = useSelector((state: RootState) => state.chapters.course);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let { path, url } = useRouteMatch();

  return (
    <div className="app">
      <Switch>
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
