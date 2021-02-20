import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import Film from '../film/film';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NotFound from '../not-found/not-found';
import Validator from '../../validate';

const App = (props) => {
  const {films, reviews} = props;

  const [, , promo] = films;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main movies={films} promo={promo} />
        </Route>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/mylist">
          <MyList movies={films} />
        </Route>
        <Route exact path="/films/:id">
          <Film movies={films} reviews={reviews} />
        </Route>
        <Route exact path="/films/:id/review">
          <AddReview movies={films} />
        </Route>
        <Route exact path="/player/:id" >
          <Player movies={films} />
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
