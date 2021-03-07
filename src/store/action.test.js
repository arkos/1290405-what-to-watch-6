import {changeGenre, loadMovies, ActionType, requireAuthorization} from '../store/action';
import {AuthorizationStatus} from '../util/const';

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing genre returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_GENRE,
      payload: `Comedy`
    };

    expect(changeGenre(`Comedy`)).toEqual(expectedAction);
  });

  it(`Action creator for loading movies returns correct action`, () => {
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

    const expectedAction = {
      type: ActionType.LOAD_MOVIES,
      payload: movies
    };

    expect(loadMovies(movies)).toEqual(expectedAction);
  });

  it(`Action creator for requiring authorization returns correct action`, () => {
    const expectedAction = {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH
    };

    expect(requireAuthorization(AuthorizationStatus.AUTH)).toEqual(expectedAction);
  });
});
