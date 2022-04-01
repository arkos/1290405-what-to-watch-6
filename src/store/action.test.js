import {
  changeGenre,
  loadMovies,
  ActionType,
  requireAuthorization,
  redirectToRoute,
  changeActiveTab,
  changeCountToRender,
  resetMain,
  changeDataProcessingState,
  reloadMovie,
  loadPromo,
  loadReviews,
  loadFavorites,
  saveReview,
  addFavorite,
  loadUser,
} from "../store/action";
import {
  AuthorizationStatus,
  TabName,
  MOVIES_PER_PAGE,
  State,
} from "../util/const";
import { adaptToClient } from "../util/movie";

const user = {
  email: `Oliver.conner@gmail.com`,
  password: `12345678`,
};

const movies = [
  {
    name: `Johnny English`,
    poster_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/Johnny_English.jpg`,
    preview_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/johnny-english.jpg`,
    background_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/Johnny_English.jpg`,
    background_color: `#F0DBA2`,
    description: `After a sudden attack on the MI5, Johnny English, Britain's most confident yet unintelligent spy, becomes Britain's only spy.`,
    rating: 10,
    scores_count: 136843,
    director: `Peter Howitt`,
    starring: [`Rowan Atkinson`, `John Malkovich`, `Natalie Imbruglia`],
    run_time: 88,
    genre: `Comedy`,
    released: 2003,
    id: 1,
    is_favorite: false,
    video_link: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    preview_video_link: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
  {
    name: `What We Do in the Shadows`,
    poster_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/What-We-Do-in-the-Shadows.jpg`,
    preview_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/what-we-do-in-the-shadows.jpg`,
    background_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/What-We-Do-in-the-Shadows.jpg`,
    background_color: `#A39E81`,
    description: `A look into the daily (or rather, nightly) lives of three vampires who've lived together for over 100 years, in Staten Island.`,
    rating: 7.2,
    scores_count: 6173,
    director: `Jemaine Clement`,
    starring: [`Kayvan Novak`, `Matt Berry`, `Natasia Demetriou`],
    run_time: 30,
    genre: `Comedy`,
    released: 2019,
    id: 2,
    is_favorite: true,
    video_link: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    name: `The Revenant`,
    poster_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/Revenant.jpg`,
    preview_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/revenant.jpg`,
    background_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/Revenant.jpg`,
    background_color: `#92918B`,
    description: `A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team.`,
    rating: 4,
    scores_count: 618498,
    director: `Alejandro G. Iñárritu`,
    starring: [`Leonardo DiCaprio`, `Tom Hardy`, `Will Poulter`],
    run_time: 156,
    genre: `Action`,
    released: 2015,
    id: 3,
    is_favorite: false,
    video_link: `http://media.xiph.org/mango/tears_of_steel_1080p.webm`,
    preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    name: `We need to talk about Kevin`,
    poster_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/We_need_to_talk_about_Kevin.jpg`,
    preview_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/we-need-to-talk-about-kevin.jpg`,
    background_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/We_need_to_talk_about_Kevin.jpg`,
    background_color: `#E1DFDE`,
    description: `Kevin's mother struggles to love her strange child, despite the increasingly dangerous things he says and does as he grows up. But Kevin is just getting started, and his final act will be beyond anything anyone imagined.`,
    rating: 3.8,
    scores_count: 123240,
    director: `Lynne Ramsay`,
    starring: [`Tilda Swinton`, `John C. Reilly`, `Ezra Miller`],
    run_time: 112,
    genre: `Drama`,
    released: 2011,
    id: 4,
    is_favorite: true,
    video_link: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    preview_video_link: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
];

const favorites = [
  {
    name: `What We Do in the Shadows`,
    poster_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/What-We-Do-in-the-Shadows.jpg`,
    preview_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/what-we-do-in-the-shadows.jpg`,
    background_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/What-We-Do-in-the-Shadows.jpg`,
    background_color: `#A39E81`,
    description: `A look into the daily (or rather, nightly) lives of three vampires who've lived together for over 100 years, in Staten Island.`,
    rating: 7.2,
    scores_count: 6173,
    director: `Jemaine Clement`,
    starring: [`Kayvan Novak`, `Matt Berry`, `Natasia Demetriou`],
    run_time: 30,
    genre: `Comedy`,
    released: 2019,
    id: 2,
    is_favorite: true,
    video_link: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    preview_video_link: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    name: `We need to talk about Kevin`,
    poster_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/We_need_to_talk_about_Kevin.jpg`,
    preview_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/we-need-to-talk-about-kevin.jpg`,
    background_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/We_need_to_talk_about_Kevin.jpg`,
    background_color: `#E1DFDE`,
    description: `Kevin's mother struggles to love her strange child, despite the increasingly dangerous things he says and does as he grows up. But Kevin is just getting started, and his final act will be beyond anything anyone imagined.`,
    rating: 3.8,
    scores_count: 123240,
    director: `Lynne Ramsay`,
    starring: [`Tilda Swinton`, `John C. Reilly`, `Ezra Miller`],
    run_time: 112,
    genre: `Drama`,
    released: 2011,
    id: 4,
    is_favorite: true,
    video_link: `http://peach.themazzone.com/durian/movies/sintel-1024-surround.mp4`,
    preview_video_link: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  },
];

const reviews = [
  {
    id: 1,
    user: {
      id: 13,
      name: `Zak`,
    },
    rating: 1.4,
    comment: `This movie is just plain bad. There must be some big payola going round this awards season. Badly written, average acting at best, all the characters are unrelatable and inlikeable. 2 hours of my life wasted.`,
    date: `2021-03-07T08:04:28.658Z`,
  },
  {
    id: 2,
    user: {
      id: 17,
      name: `Emely`,
    },
    rating: 7.2,
    comment: `This movie is just plain bad. There must be some big payola going round this awards season. Badly written, average acting at best, all the characters are unrelatable and inlikeable. 2 hours of my life wasted.`,
    date: `2021-02-22T08:04:28.658Z`,
  },
];

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing genre returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_GENRE,
      payload: `Comedy`,
    };

    expect(changeGenre(`Comedy`)).toEqual(expectedAction);
  });

  it(`Action creator for changing active tab returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_ACTIVE_TAB,
      payload: TabName.DETAILS,
    };

    expect(changeActiveTab(TabName.DETAILS)).toEqual(expectedAction);
  });

  it(`Action creator for changing count to render returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_COUNT_TO_RENDER,
      payload: MOVIES_PER_PAGE,
    };

    expect(changeCountToRender(MOVIES_PER_PAGE)).toEqual(expectedAction);
  });

  it(`Action creator for resetting main returns correct action`, () => {
    const expectedAction = {
      type: ActionType.RESET_MAIN,
    };

    expect(resetMain()).toEqual(expectedAction);
  });

  it(`Action creator for changing data processing state returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_DATA_PROCESSING_STATE,
      payload: State.SAVING,
    };

    expect(changeDataProcessingState(State.SAVING)).toEqual(expectedAction);
  });

  it(`Action creator for loading movies returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_MOVIES,
      payload: movies,
    };

    expect(loadMovies(movies)).toEqual(expectedAction);
  });

  it(`Action creator for reloading movie returns correct action`, () => {
    const movie = {
      name: `Johnny English`,
      poster_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/Johnny_English.jpg`,
      preview_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/johnny-english.jpg`,
      background_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/Johnny_English.jpg`,
      background_color: `#F0DBA2`,
      description: `After a sudden attack on the MI5, Johnny English, Britain's most confident yet unintelligent spy, becomes Britain's only spy.`,
      rating: 10,
      scores_count: 136843,
      director: `Peter Howitt`,
      starring: [`Rowan Atkinson`, `John Malkovich`, `Natalie Imbruglia`],
    };

    const adaptedMovie = adaptToClient(movie);

    const expectedAction = {
      type: ActionType.RELOAD_MOVIE,
      payload: adaptedMovie,
    };

    expect(reloadMovie(adaptedMovie)).toEqual(expectedAction);
  });

  it(`Action creator for loading promo movie returns correct action`, () => {
    const promo = {
      name: `Johnny English`,
      poster_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/poster/Johnny_English.jpg`,
      preview_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/preview/johnny-english.jpg`,
      background_image: `https://assets.htmlacademy.ru/intensives/javascript-3/film/background/Johnny_English.jpg`,
      background_color: `#F0DBA2`,
      description: `After a sudden attack on the MI5, Johnny English, Britain's most confident yet unintelligent spy, becomes Britain's only spy.`,
      rating: 10,
      scores_count: 136843,
      director: `Peter Howitt`,
      starring: [`Rowan Atkinson`, `John Malkovich`, `Natalie Imbruglia`],
    };

    const adaptedPromo = adaptToClient(promo);

    const expectedAction = {
      type: ActionType.LOAD_PROMO,
      payload: adaptedPromo,
    };

    expect(loadPromo(adaptedPromo)).toEqual(expectedAction);
  });

  it(`Action creator for loading reviews returns correct action`, () => {
    const [movie] = movies;

    const expectedAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: {
        reviews,
        movieId: movie.id,
      },
    };

    expect(loadReviews(reviews, movie.id)).toEqual(expectedAction);
  });

  it(`Action creator for loading favorites returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_FAVORITES,
      payload: favorites,
    };

    expect(loadFavorites(favorites)).toEqual(expectedAction);
  });

  it(`Action creator for saving review returns correct action`, () => {
    const [review] = reviews;
    const [movie] = movies;

    const expectedAction = {
      type: ActionType.SAVE_REVIEW,
      payload: {
        review,
        movieId: movie.id,
      },
    };

    expect(saveReview(review, movie.id)).toEqual(expectedAction);
  });

  it(`Action creator for adding favorite returns correct action`, () => {
    const [movie] = movies;

    const expectedAction = {
      type: ActionType.ADD_FAVORITE,
      payload: movie,
    };

    expect(addFavorite(movie)).toEqual(expectedAction);
  });

  it(`Action creator for requiring authorization returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    };

    expect(requireAuthorization(AuthorizationStatus.AUTH)).toEqual(
      expectedAction
    );
  });

  it(`Action creator for loading user returns correct action`, () => {
    const expectedAction = {
      type: ActionType.LOAD_USER,
      payload: user,
    };

    expect(loadUser(user)).toEqual(expectedAction);
  });

  it(`Action creator for redirecting to route returns correct action`, () => {
    const url = `https://htmlacademy.ru`;

    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: url,
    };

    expect(redirectToRoute(url)).toEqual(expectedAction);
  });
});
