import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const MOVIE_GENRE = `Comedy`;
const MOVIE_YEAR = 2019;

ReactDOM.render(
    <App genre={MOVIE_GENRE} year={MOVIE_YEAR}/>,
    document.querySelector(`#root`)
);
