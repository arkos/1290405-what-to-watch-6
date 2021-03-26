import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../util/const';
import {login} from '../../store/api-actions';

const SignIn = () => {
  const loginRef = useRef();
  const passwordRef = useRef();

  const [signInMessage, setSignInMessage] = useState({
    emailMessage: ``,
    passwordMessage: ``
  });

  const dispatch = useDispatch();

  const {authorizationStatus} = useSelector((state) => state.USER);

  if (authorizationStatus === AuthorizationStatus.UNKNOWN) {
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <h1 className="page-title user-page__title">Authorization in progress...</h1>
        </header>

        <footer className="page-footer">
          <div className="logo">
            <div to={AppRoute.ROOT} className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </div>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return <Redirect to={AppRoute.ROOT}/>;
  }

  const validateEmail = () => {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailPattern.test(loginRef.current.value.toLowerCase());
  };

  const validatePassword = () => {
    return passwordRef.current.value;
  };

  const validateAll = () => {
    setSignInMessage({...signInMessage, emailMessage: ``, passwordMessage: ``});

    if (!validateEmail()) {
      setSignInMessage((prevSignInMessage) => {
        return {...prevSignInMessage, emailMessage: `Please enter a valid email address`};
      });

      return;
    }

    if (!validatePassword()) {
      setSignInMessage((prevSignInMessage) => {
        return {...prevSignInMessage, passwordMessage: `Please enter a valid password`};
      });
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (signInMessage.emailMessage || signInMessage.passwordMessage) {
      return;
    }

    dispatch(login({
      login: loginRef.current.value,
      password: passwordRef.current.value
    }));
  };

  const handleFieldChange = () => {
    validateAll();
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.ROOT} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          {(!!signInMessage.emailMessage || !!signInMessage.passwordMessage) && <div className="sign-in__message">
            <p>{signInMessage.emailMessage || signInMessage.passwordMessage}</p>
          </div>}
          <div className="sign-in__fields">
            <div className={`sign-in__field ${signInMessage.emailMessage ? `sign-in__field--error` : ``}`}>
              <input ref={loginRef} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" data-testid="user-email" onChange={handleFieldChange} />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className={`sign-in__field ${signInMessage.passwordMessage ? `sign-in__field--error` : ``}`}>
              <input ref={passwordRef} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" data-testid="user-password" onChange={handleFieldChange}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoute.ROOT} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

export default SignIn;
