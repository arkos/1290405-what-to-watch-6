import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import films from './mocks/films';
import reviews from './mocks/reviews';

const MOVIE_GENRE = `Comedy`;
const MOVIE_YEAR = 2019;

ReactDOM.render(
    <App genre={MOVIE_GENRE} year={MOVIE_YEAR} films={films} reviews={reviews}/>,
    document.querySelector(`#root`)
);
