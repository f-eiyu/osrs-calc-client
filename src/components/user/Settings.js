import { Link } from "react-router-dom";

const menuStyle = {
  listStyleType: "none",
  margin: "0",
  padding: "0"
}

const Settings = (props) => {
  const { user, setUser } = props;

  const handleCheck = (event) => {
    const newUser = { ...user };
    newUser.darkmode = event.target.checked;
    setUser(newUser);
  };

  return (
    <div>
      <h1>Account Options</h1>
      <ul style={menuStyle}>
        <li><Link to="/change-password">Change password</Link></li>
        <li><Link to="/loadouts">Loadouts</Link></li>
        <li>
          <span>Dark mode?</span>
          <input
            type="checkbox"
            checked={user.darkmode}
            onChange={handleCheck}
          />
        </li>
      </ul>
    </div>
  );
}

export default Settings;