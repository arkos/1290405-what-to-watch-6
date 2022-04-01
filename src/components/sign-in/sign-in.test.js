import React from "react";
import { Router } from "react-router-dom";
import * as redux from "react-redux";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import configureStore from "redux-mock-store";
import { createMemoryHistory } from "history";
import SignIn from "./sign-in";
import { AuthorizationStatus } from "../../util/const";

const mockStore = configureStore({});

it(`Render 'SignIn' when user navigates to '/login' url`, () => {
  const history = createMemoryHistory();

  render(
    <redux.Provider
      store={mockStore({
        USER: {
          user: {
            avatarUrl: `avatar.jpg`,
          },
          authorizationStatus: AuthorizationStatus.NO_AUTH,
        },
      })}
    >
      <Router history={history}>
        <SignIn />
      </Router>
    </redux.Provider>
  );

  expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
  expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

  userEvent.type(screen.getByTestId(`user-email`), `donald@yahoo.com`);
  userEvent.type(screen.getByTestId(`user-password`), `123456`);

  expect(screen.getByDisplayValue(/donald@yahoo.com/i)).toBeInTheDocument();
  expect(screen.getByDisplayValue(/123456/i)).toBeInTheDocument();
});
