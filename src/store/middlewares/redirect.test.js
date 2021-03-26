import {redirect} from './redirect';
import {ActionType, redirectToRoute} from '../action';

const mockRedux = () => {
  const store = {
    getState: jest.fn(() => {}),
    dispatch: jest.fn(() => {})
  };

  const next = jest.fn();
  const invoke = (action) => redirect(store)(next)(action);
  return {store, next, invoke};
};

const fakeHistory = {
  location: {pathname: ``},
  push(path) {
    this.location.pathname = path;
  }
};

jest.mock(`../../util/browser-history`, () => fakeHistory);

describe(`Custom middleware works correctly`, () => {
  it(`Action passes to next middleware`, () => {
    const {invoke, next} = mockRedux();

    const action = redirectToRoute(`/`);
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it(`Redirect route should be added to fakeHistory`, () => {
    const {invoke} = mockRedux();
    invoke(redirectToRoute(`/login`));
    expect(fakeHistory.location.pathname).toBe(`/login`);
  });

  it(`Don't redicrect if bad action is supplied`, () => {
    const url = `/test-url`;
    const {invoke} = mockRedux();

    invoke({type: `BAD_ACTION`, payload: url});
    expect(fakeHistory.location.pathname).not.toBe(url);
  });
});
