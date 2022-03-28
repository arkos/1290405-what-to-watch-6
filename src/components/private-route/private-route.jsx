import React from "react";
import { Navigate, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import { AuthorizationStatus } from "../../util/const";
import { AppRoute } from "../../util/const";

const PrivateRoute = ({ render, path }) => {
  const { authorizationStatus } = useSelector((state) => state.USER);

  return (
    <Route
      path={path}
      render={(routeProps) => {
        return authorizationStatus === AuthorizationStatus.AUTH ? (
          render(routeProps)
        ) : (
          <Navigate to={AppRoute.LOGIN} />
        );
      }}
    ></Route>
  );
};

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRoute;
