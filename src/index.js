import React from "react";
import ReactDOM from "react-dom";
import { unstable_HistoryRouter as BrowserRouter } from "react-router-dom";
import browserHistory from "./util/browser-history";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./store/root-reducer";
import { AuthorizationStatus } from "./util/const";
import { requireAuthorization } from "./store/action";
import { createAPI } from "./services/api";
import { checkAuth } from "./store/api-actions";
import { redirect } from "./store/middlewares/redirect";
import App from "./components/app/app";

const api = createAPI(() =>
  store.dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH))
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(checkAuth());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.querySelector(`#root`)
);
