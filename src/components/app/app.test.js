import React from 'react';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import App from '../app/app';
import {AppRoute} from '../../util/const';

const mockStore = configureStore({});

describe(`Test routing`, () => {
  jest.spyOn(redux, `useSelector`);
  jest.spyOn(redux, `useDispatch`);

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
