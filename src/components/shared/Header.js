import { Link } from "react-router-dom";

const linkStyle = {
};

const titleDiv = (
  <div id="title">
    <Link to="/" style={linkStyle}>OSRS DPS Calculator</Link>
  </div>
);

const authenticatedOptions = (
  <div id="header">
    <div>
      <Link to="/settings" style={linkStyle}>Account</Link>
    </div>
    {titleDiv}
    <div>
      <Link to="/sign-out" style={linkStyle}>Sign Out</Link>
    </div>
  </div>
);

const unauthenticatedOptions = (
  <div id="header">
    <div>
      <Link to="/sign-up" style={linkStyle}>Sign Up</Link>
    </div>
    {titleDiv}
    <div>
      <Link to="/sign-in" style={linkStyle}>Sign In</Link>
    </div>
  </div>
);

const Header = (props) => {
  const { user } = props;

  return (user ? authenticatedOptions : unauthenticatedOptions);
}

export default Header;