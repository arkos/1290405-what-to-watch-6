import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {APIRoute} from '../../util/const';
import {getPromoMovieUrl} from '../../util/route';
import {addFavorite, loadFavorites, loadMovies, loadPromo, loadReviews, reloadMovie, saveReview} from '../action';
import {fetchMovies, fetchPromo} from '../api-actions';
import {movieData} from './movie-data';


const api = createAPI(() => {});

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

describe(`Reducer 'movieData should work correctly'`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(movieData(undefined, {}))
    .toEqual({
      movies: [],
      isDataLoaded: false,
    });
  });

  it(`Reducer should update movies by loadMovies`, () => {
    const state = {movies, isDataLoaded: false};
    expect(movieData(state, loadMovies(movies)))
    .toEqual({movies, isDataLoaded: true});
  });

  it(`Reducer should update reviews by loadReviews`, () => {
    const sampleMovies = [
      {
        name: `Second`,
        id: 2
      },
      {
        name: `First`,
        id: 1
      },
    ];

    const [, sampleMovie] = sampleMovies;

    const state = {movies: sampleMovies, isDataLoaded: true};

    const sampleReviews = [
      {
        id: 1,
        user: {},
        comment: ``
      },
      {
        id: 2,
        user: {},
        comment: ``
      }
    ];

    expect(movieData(state, loadReviews(sampleReviews, sampleMovie.id)))
      .toEqual({movies: expect.arrayContaining(
          [expect.objectContaining({reviews: sampleReviews})]), isDataLoaded: true}
      );
  });

  it(`Reducer should update reviews by loadReviews even if there are no reviews`, () => {
    const sampleMovies = [
      {
        name: `Second`,
        id: 2
      },
      {
        name: `First`,
        id: 1
      },
    ];

    const [, sampleMovie] = sampleMovies;

    const state = {movies: sampleMovies, isDataLoaded: true};

    const sampleReviews = [];

    expect(movieData(state, loadReviews(sampleReviews, sampleMovie.id)))
        .toEqual({movies: expect.arrayContaining(
            [expect.objectContaining({reviews: sampleReviews})]), isDataLoaded: true}
        );
  });

  it(`Reducer should not update movie by reloadMovie if it's null`, () => {
    const sampleMovies = [
      {
        name: `First`,
        id: 1
      },
      {
        name: `Second`,
        id: 2
      },
    ];

    const state = {movies: sampleMovies, isDataLoaded: true};

    expect(movieData(state, reloadMovie(null))).toEqual({movies: expect.not.arrayContaining([null]), isDataLoaded: true});
  });

  it(`Reducer should update movie by reloadMovie if it's not null`, () => {
    const sampleMovies = [
      {
        name: `First`,
        id: 1
      },
      {
        name: `Second`,
        id: 2
      },
    ];

    const state = {movies: sampleMovies, isDataLoaded: true};

    const expectedMovie = {name: `Third`, id: 3};

    expect(movieData(state, reloadMovie(expectedMovie))).toEqual({movies: expect.arrayContaining([expectedMovie]), isDataLoaded: true});
  });

  it(`Reducer should add the movie by reloadMovie if it doesn't exist`, () => {
    const state = {movies: [], isDataLoaded: true};

    const expectedMovie = {name: `First`, id: 1};

    expect(movieData(state, reloadMovie(expectedMovie)))
      .toEqual({movies: expect.arrayContaining([expectedMovie]), isDataLoaded: true});
  });

  it(`Reducer should not add a review for a movie by saveReview if the movie doesn't exist`, () => {
    const state = {movies: [{id: 2, name: ``, reviews: []}]};
    const review = {comment: ``};
    const result = movieData(state, saveReview(review, 1));

    expect(result)
      .toEqual({movies: expect.arrayContaining([expect.objectContaining({id: 2, name: ``})])});

    expect(result)
      .toEqual({movies: expect.arrayContaining([expect.not.objectContaining({reviews: expect.arrayContaining([review])})])});
  });

  it(`Reducer should add a review for a movie by saveReview`, () => {
    const state = {movies: [{id: 1, name: ``, reviews: []}]};
    const review = {comment: ``};
    const result = movieData(state, saveReview(review, 1));

    expect(result)
      .toEqual({movies: expect.arrayContaining([expect.objectContaining({id: 1, name: ``, reviews: expect.arrayContaining([review])})])});
  });

  it(`Reducer should not mark a movie as favorite by addFavorite if the movie doesn't exist`, () => {
    const state = {movies: [{id: 1, name: ``}]};
    const result = movieData(state, addFavorite({id: 2, name: ``, isFavorite: true}));

    expect(result)
      .toEqual({movies: expect.arrayContaining([expect.objectContaining({id: 1, name: ``})])});

    expect(result)
      .toEqual({movies: expect.not.arrayContaining([{id: 1, name: ``, isFavorite: true}])});
  });

  it(`Reducer should mark a movie as favorite by addFavorite`, () => {
    const state = {movies: [{id: 1, name: ``}]};
    const result = movieData(state, addFavorite({id: 1, name: ``, isFavorite: true}));

    expect(result)
      .toEqual({movies: expect.arrayContaining([expect.objectContaining({id: 1, name: ``, isFavorite: true})])});
  });

  it(`Reducer should add all favorite movies by loadFavorites if there are no other movies`, () => {
    const state = {movies: []};

    const favorites = [
      {id: 1, isFavorite: true},
      {id: 2, isFavorite: true},
      {id: 3, isFavorite: true},
    ];

    expect(movieData(state, loadFavorites(favorites)))
      .toEqual({movies: expect.arrayContaining([...favorites])});
  });

  it(`Reducer should add favorite movies by loadFavorites`, () => {
    const state = {movies: [{id: 1}]};

    const favorites = [
      {id: 1, isFavorite: true},
      {id: 2, isFavorite: true},
      {id: 3, isFavorite: true},
    ];

    const result = movieData(state, loadFavorites(favorites));

    expect(result)
      .toEqual({movies: expect.arrayContaining([{id: 1, isFavorite: true}])});

    expect(result)
      .toEqual({movies: expect.not.arrayContaining([{id: 2, isFavorite: true}])});
  });

  it(`Reducer should mark a movie as promo by loadPromo`, () => {
    const state = {
      movies: [
        {id: 1},
        {id: 2},
        {id: 3},
      ]};

    expect(movieData(state, loadPromo({id: 1})))
      .toEqual({movies: expect.arrayContaining([{id: 1, isPromo: true}, {id: 2, isPromo: false}, {id: 3, isPromo: false}])});
  });
});

describe(`Async operation should work correctly`, () => {
  it(`Should make a correct API call to /films`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const movieLoader = fetchMovies();

    apiMock
      .onGet(APIRoute.MOVIES)
      .reply(200, [{fake: true}]);

    return movieLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenNthCalledWith(1,
            loadMovies([{fake: true}])
        );
      });
  });

  it(`Should make a correct API call to /films/promo`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoLoader = fetchPromo();

    apiMock
      .onGet(getPromoMovieUrl())
      .reply(200, {fake: true});

    return promoLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1,
            loadPromo({fake: true})
        );
      });
  });
});
