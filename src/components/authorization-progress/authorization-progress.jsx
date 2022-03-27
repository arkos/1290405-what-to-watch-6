import React from 'react';

const AuthorizationProgress = () => {
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <h1 className="page-title user-page__title">Authorization in progress...</h1>
      </header>

      <footer className="page-footer">
        <div className="logo">
          <div className="logo__link logo__link--light">
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
};

export default AuthorizationProgress;
