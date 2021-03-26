import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../services/api';
import {APIRoute, AppRoute, AuthorizationStatus} from '../../util/const';
import {loadUser, redirectToRoute, requireAuthorization} from '../action';
import {checkAuth, login} from '../api-actions';
import {user} from './user';

const api = createAPI(() => {});

describe(`Reducer 'user' should work correctly`, () => {
  it(`Reducer without additional parameters should return initial state`, () => {
    expect(user(undefined, {}))
    .toEqual({authorizationStatus: AuthorizationStatus.NO_AUTH, user: null});
  });

  it(`Reducer should update authorization status to 'auth'`, () => {
    const state = {authorizationStatus: AuthorizationStatus.NO_AUTH};
    expect(user(state, requireAuthorization(AuthorizationStatus.AUTH)))
    .toEqual({authorizationStatus: AuthorizationStatus.AUTH});
  });
});

describe(`Async operation should work correctly`, () => {
  it(`Should make a correct API get call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthLoader = checkAuth();

    apiMock
      .onGet(APIRoute.LOGIN)
      .reply(200, {fake: true});

    return checkAuthLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenNthCalledWith(1, requireAuthorization(AuthorizationStatus.UNKNOWN));
        expect(dispatch).toHaveBeenNthCalledWith(2, loadUser({fake: true}));
        expect(dispatch).toHaveBeenNthCalledWith(3, requireAuthorization(AuthorizationStatus.AUTH));
      });
  });

  it(`Should make a correct API post call to /login`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const fakeUser = {email: `test@test.com`, password: `123456`};
    const loginLoader = login(fakeUser);

    apiMock
      .onPost(APIRoute.LOGIN)
      .reply(200, {fake: true});

    return loginLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(4);
        expect(dispatch).toHaveBeenNthCalledWith(1, requireAuthorization(AuthorizationStatus.UNKNOWN));
        expect(dispatch).toHaveBeenNthCalledWith(2, loadUser({fake: true}));
        expect(dispatch).toHaveBeenNthCalledWith(3, requireAuthorization(AuthorizationStatus.AUTH));
        expect(dispatch).toHaveBeenNthCalledWith(4, redirectToRoute(AppRoute.ROOT));
      });
  });
});
