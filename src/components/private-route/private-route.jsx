import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthorizationStatus } from "../../util/const";
import { AppRoute } from "../../util/const";

const PrivateRoute = ({ children }) => {
  const { authorizationStatus } = useSelector((state) => state.USER);

  return authorizationStatus === AuthorizationStatus.AUTH ? (
    children
  ) : (
    <Navigate to={AppRoute.LOGIN} />
  );
};

export default PrivateRoute;
