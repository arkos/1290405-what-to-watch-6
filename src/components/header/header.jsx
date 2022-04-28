import Logo from "../logo/logo";
import SignInIndicator from "../sign-in-indicator/sign-in-indicator";

const Header = ({ className, href, children }) => {
  return (
    <header className={`page-header ${className}`}>
      {children ? (
        children
      ) : (
        <>
          <Logo href={href} />
          <SignInIndicator />
        </>
      )}
    </header>
  );
};

export default Header;
