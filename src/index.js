import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './components/app/app';
import films from './mocks/films';
import reviews from './mocks/reviews';
import {reducer} from './store/reducer';

const MOVIE_GENRE = `Comedy`;
const MOVIE_YEAR = 2019;

const store = createStore(reducer);

ReactDOM.render(
    <Provider store={store}>
      <App
        genre={MOVIE_GENRE}
        year={MOVIE_YEAR}
        films={films}
        reviews={reviews}
      />
    </Provider>,
    document.querySelector(`#root`)
);
