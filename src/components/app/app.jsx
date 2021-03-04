import React from 'react';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import browserHistory from '../../util/browser-history';
import PrivateRoute from '../private-route/private-route';
import {getReviewUrl, getPlayerUrl, getMovieUrl} from '../../util/route';
import {AppRoute} from '../../util/const';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from '../film/film';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NotFound from '../not-found/not-found';
import Validator from '../../util/validate';

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <SignIn />
        </Route>
        <PrivateRoute exact path={AppRoute.MYLIST} render={() => <MyList /> }>
        </PrivateRoute>
        <Route exact path={getMovieUrl()}>
          <Film />
        </Route>
        <PrivateRoute exact path={getReviewUrl()} render={() => <AddReview />}>
        </PrivateRoute>
        <Route exact path={getPlayerUrl()} >
          <Player />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = Validator.APP;

export default App;
