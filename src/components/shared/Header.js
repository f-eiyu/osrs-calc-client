import { Link } from "react-router-dom";

const titleDiv = (
  <div id="title">
    <Link to="/">OSRS DPS Calculator</Link>
  </div>
);

const authenticatedOptions = (
  <div id="header">
    <div>
      <Link to="/settings">Settings</Link>
    </div>
    {titleDiv}
    <div>
      <Link to="/sign-out">Sign Out</Link>
    </div>
  </div>
);

const unauthenticatedOptions = (
  <div id="header">
    <div>
      <Link to="/sign-up">Sign Up</Link>
    </div>
    {titleDiv}
    <div>
      <Link to="/sign-in">Sign In</Link>
    </div>
  </div>
);

const Header = (props) => {
  const { user } = props;

  return (user ? authenticatedOptions : unauthenticatedOptions);
}

export default Header;