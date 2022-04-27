import SignInIndicator from "../sign-in-indicator/sign-in-indicator";

const Header = ({ className }) => {
  return (
    <header className={`page-header ${className}`}>
      <div className="logo">
        <a className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      <SignInIndicator />
    </header>
  );
};

export default Header;
