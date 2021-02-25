import React from 'react';
import {Switch, Route, Router as BrowserRouter} from 'react-router-dom';
import {browserHistory} from '../../browser-history';
import PrivateRoute from '../private-route/private-route';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from '../film/film';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NotFound from '../not-found/not-found';
import Validator from '../../validate';

const App = () => {
  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <PrivateRoute exact path="/mylist" render={() => <MyList /> }>
        </PrivateRoute>
        <Route exact path="/films/:id">
          <Film />
        </Route>
        <PrivateRoute exact path="/films/:id/review" render={() => <AddReview />}>
        </PrivateRoute>
        <Route exact path="/player/:id" >
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
