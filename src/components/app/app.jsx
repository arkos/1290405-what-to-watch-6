import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../private-route/private-route";
import { getReviewUrl, getPlayerUrl, getMovieUrl } from "../../util/route";
import { AppRoute } from "../../util/const";
import Main from "../main/main";
import SignIn from "../sign-in/sign-in";
import MyList from "../my-list/my-list";
import Film from "../film/film";
import AddReview from "../add-review/add-review";
import Player from "../player/player";
import NotFound from "../not-found/not-found";
import Validator from "../../util/validate";

const App = () => {
  return (
    <Routes>
      <Route path={AppRoute.ROOT} element={<Main />} />
      <Route path={AppRoute.LOGIN} element={<SignIn />} />
      <Route
        path={AppRoute.MYLIST}
        element={
          <PrivateRoute>
            <MyList />
          </PrivateRoute>
        }
      />
      <Route path={getMovieUrl()} element={<Film />} />
      <Route
        path={getReviewUrl()}
        element={
          <PrivateRoute>
            <AddReview />
          </PrivateRoute>
        }
      />
      <Route path={getPlayerUrl()} element={<Player />} />
      <Route element={<NotFound />} />
    </Routes>
  );
};

App.propTypes = Validator.APP;

export default App;
