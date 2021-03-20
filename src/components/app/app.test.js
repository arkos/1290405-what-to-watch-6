import React from 'react';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import App from '../app/app';
import {AppRoute, AuthorizationStatus, State} from '../../util/const';
import {getPlayerUrl, getReviewUrl} from '../../util/route';
import {adaptToClient} from '../../util/movie';

const mockStore = configureStore({});

const movies = [
  {
    "name": `Johnny English`,
    "poster_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/Johnny_English.jpg`,
    "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/johnny-english.jpg`,
    "background_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/Johnny_English.jpg`,
    "background_color": `#F0DBA2`,
    "description": `After a sudden attack on the MI5, Johnny English, Britain's most confident yet unintelligent spy, becomes Britain's only spy.`,
    "rating": 10,
    "scores_count": 136843,
    "director": `Peter Howitt`,
    "starring": [
      `Rowan Atkinson`,
      `John Malkovich`,
      `Natalie Imbruglia`
    ],
    "run_time": 88,
    "genre": `Comedy`,
    "released": 2003,
    "id": 1,
    "is_favorite": false,
    "video_link": `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    "preview_video_link": `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  },
  {
    "name": `What We Do in the Shadows`,
    "poster_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/What-We-Do-in-the-Shadows.jpg`,
    "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/what-we-do-in-the-shadows.jpg`,
    "background_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/What-We-Do-in-the-Shadows.jpg`,
    "background_color": `#A39E81`,
    "description": `A look into the daily (or rather, nightly) lives of three vampires who've lived together for over 100 years, in Staten Island.`,
    "rating": 7.2,
    "scores_count": 6173,
    "director": `Jemaine Clement`,
    "starring": [
      `Kayvan Novak`,
      `Matt Berry`,
      `Natasia Demetriou`
    ],
    "run_time": 30,
    "genre": `Comedy`,
    "released": 2019,
    "id": 2,
    "is_favorite": false,
    "video_link": `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    "preview_video_link": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    "name": `The Revenant`,
    "poster_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/Revenant.jpg`,
    "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/revenant.jpg`,
    "background_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/Revenant.jpg`,
    "background_color": `#92918B`,
    "description": `A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.`,
    "rating": 4,
    "scores_count": 618498,
    "director": `Alejandro G. Iñárritu`,
    "starring": [
      `Leonardo DiCaprio`,
      `Tom Hardy`,
      `Will Poulter`
    ],
    "run_time": 156,
    "genre": `Action`,
    "released": 2015,
    "id": 3,
    "is_favorite": false,
    "video_link": `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
    "preview_video_link": `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    "name": `We need to talk about Kevin`,
    "poster_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/We_need_to_talk_about_Kevin.jpg`,
    "preview_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/we-need-to-talk-about-kevin.jpg`,
    "background_image": `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/We_need_to_talk_about_Kevin.jpg`,
    "background_color": `#E1DFDE`,
    "description": `Kevin's mother struggles to love her strange child, despite the increasingly dangerous things he says and does as he grows up. But Kevin is just getting started, and his final act will be beyond anything anyone imagined.`,
    "rating": 3.8,
    "scores_count": 123240,
    "director": `Lynne Ramsay`,
    "starring": [
      `Tilda Swinton`,
      `John C. Reilly`,
      `Ezra Miller`
    ],
    "run_time": 112,
    "genre": `Drama`,
    "released": 2011,
    "id": 4,
    "is_favorite": false,
    "video_link": `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    "preview_video_link": `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`
  }
];

describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

  it(`Render Player when authorized user navigates to /player/:id`, () => {
    const testMovie = adaptToClient(movies[0]);

    const history = createMemoryHistory();
    history.push(getPlayerUrl(testMovie.id));

    render(
        <redux.Provider store={mockStore({
          DATA: {movies, isDataLoaded: true},
          MOVIE: {dataProcessingState: State.DEFAULT},
          USER: {authorizationStatus: AuthorizationStatus.NO_AUTH}
        })}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Full screen/i)).toBeInTheDocument();
  });

  it(`Render Player when user navigates to /player/non-existent-id`, () => {
    const history = createMemoryHistory();
    history.push(getPlayerUrl(`non-existent-id`));

    render(
        <redux.Provider store={mockStore({
          DATA: {movies, isDataLoaded: true},
          USER: {authorizationStatus: AuthorizationStatus.NO_AUTH}
        })}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Back to home/i)).toBeInTheDocument();
  });

  it(`Render AddReview when an authorized user navigates to /films/:id/review`, () => {
    const testMovie = adaptToClient(movies[0]);

    const history = createMemoryHistory();
    history.push(getReviewUrl(testMovie.id));

    render(
        <redux.Provider store={mockStore({
          DATA: {movies, isDataLoaded: true},
          MOVIE: {dataProcessingState: State.DEFAULT},
          USER: {authorizationStatus: AuthorizationStatus.AUTH}
        })}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(new RegExp(testMovie.name, `i`))).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Review text/i)).toBeInTheDocument();
  });

  it(`Render AddReview when user navigates to non-existent movie review`, () => {
    const history = createMemoryHistory();
    history.push(getReviewUrl(`non-existent-id`));

    render(
        <redux.Provider store={mockStore({
          DATA: {movies, isDataLoaded: true},
          USER: {authorizationStatus: AuthorizationStatus.AUTH}
        })}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Back to home/i)).toBeInTheDocument();
  });

  it(`Render AddReview when an unauthorized user navigates to /films/:id/review`, () => {
    const testMovie = adaptToClient(movies[0]);

    const history = createMemoryHistory();
    history.push(getReviewUrl(testMovie.id));

    render(
        <redux.Provider store={mockStore({
          DATA: {movies, isDataLoaded: true},
          USER: {authorizationStatus: AuthorizationStatus.NO_AUTH}
        })}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it(`Render MyList when an authorized user navigates to /mylist`, () => {
    const history = createMemoryHistory();
    history.push(AppRoute.MYLIST);

    render(
        <redux.Provider store={mockStore({
          DATA: {movies, isDataLoaded: true},
          USER: {authorizationStatus: AuthorizationStatus.AUTH}
        })}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it(`Render NotFound when an unauthorized user navigates to /mylist`, () => {
    const history = createMemoryHistory();
    history.push(AppRoute.MYLIST);

    render(
        <redux.Provider store={mockStore({
          DATA: {movies, isDataLoaded: true},
          USER: {authorizationStatus: AuthorizationStatus.NO_AUTH}
        })}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it(`Render SignIn when user navigates to /login`, () => {
    const history = createMemoryHistory();
    history.push(AppRoute.LOGIN);

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );

    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it(`Render NotFound when user navigates to non-existing route`, () => {
    const history = createMemoryHistory();
    history.push(`/non-existent-route`);

    render(
        <redux.Provider store={mockStore({})}>
          <Router history={history}>
            <App />
          </Router>
        </redux.Provider>
    );
    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Back to home/i)).toBeInTheDocument();
  });
});
