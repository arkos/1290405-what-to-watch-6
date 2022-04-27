import { Link } from "react-router-dom";

const Logo = ({ href }) => {
  const inner = (
    <>
      <span className="logo__letter logo__letter--1">W</span>
      <span className="logo__letter logo__letter--2">T</span>
      <span className="logo__letter logo__letter--3">W</span>
    </>
  );

  return (
    <div className="logo">
      {href ? (
        <Link className="logo__link" to={href}>
          {inner}
        </Link>
      ) : (
        <a className="logo__link">{inner}</a>
      )}
    </div>
  );
};

export default Logo;
