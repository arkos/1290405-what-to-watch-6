import {movieProcess} from './movie-process';
import {changeGenre} from '../action';
import {FILTER_ALL_GENRES} from '../../util/const';

describe(`Reducers work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(movieProcess(undefined, {}))
    .toEqual({selectedGenre: FILTER_ALL_GENRES});
  });
  it(`Reducer should set a given genre`, () => {
    const state = {selectedGenre: `Drama`};
    expect(movieProcess(state, changeGenre(`Comedy`)))
    .toEqual({selectedGenre: `Comedy`});
  });
});
