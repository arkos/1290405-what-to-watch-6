import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {AuthorizationStatus, AppRoute} from '../../util/const';

const SignInIndicator = () => {
  const {authorizationStatus, user} = useSelector((state) => state.USER);

  return (
    <div className="user-block">
      {
        authorizationStatus === AuthorizationStatus.AUTH &&
    <div className="user-block__avatar" data-testid="user-avatar-icon">
      <Link to={AppRoute.MYLIST}>
        <img src={user.avatarUrl} alt="User avatar" width="63" height="63" />
      </Link>
    </div>
      }
      {
        authorizationStatus === AuthorizationStatus.NO_AUTH &&
      <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
      }
    </div>
  );
};

export default SignInIndicator;
