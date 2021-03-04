import {changeGenre, ActionType} from '../store/action';

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing genre returns correct action`, () => {
    const expectedAction = {
      type: ActionType.CHANGE_GENRE,
      payload: `Comedy`
    };

    expect(changeGenre(`Comedy`)).toEqual(expectedAction);
  });
});
