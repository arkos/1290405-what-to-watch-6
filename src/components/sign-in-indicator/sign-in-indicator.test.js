import React from 'react';
import {Router} from 'react-router-dom';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import SignInIndicator from './sign-in-indicator';
import {AuthorizationStatus} from '../../util/const';

const mockStore = configureStore({});

describe(`Should SignInIndicator render correctly`, () => {
  it(`Should SignInIndicator display sign-in when user is not authorized`, () => {
    const history = createMemoryHistory();

    const {getByText} = render(
        <redux.Provider store={mockStore({
          USER: {authorizationStatus: AuthorizationStatus.NO_AUTH}
        })}>
          <Router history={history}>
            <SignInIndicator />
          </Router>
        </redux.Provider>
    );

    expect(getByText(/Sign in/i)).toBeInTheDocument();
  });

  it(`Should SignInIndicator display sign-in when user is authorized`, () => {
    const history = createMemoryHistory();

    const {getByTestId} = render(
        <redux.Provider store={mockStore({
          USER: {authorizationStatus: AuthorizationStatus.AUTH}
        })}>
          <Router history={history}>
            <SignInIndicator />
          </Router>
        </redux.Provider>
    );

    expect(getByTestId(`user-avatar-icon`)).toBeInTheDocument();
  });
});
