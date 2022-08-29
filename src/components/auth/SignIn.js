import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signIn } from "../../api/auth";

const SignIn = (props) => {
  const { setUser } = props;
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormDisabled(true);

    const credentials = {
      username,
      password
    };

    signIn(credentials)
      .then(res => setUser(res.data.user))
      .then(() => navigate("/"))
      .catch(() => alert("Invalid username or password."));
    
    setFormDisabled(false);
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  return (
    <div id="sign-in-main">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span className="form-label">Username</span>
          <input
            name="username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
            disabled={formDisabled}
          />
        </label>

        <label>
          <span className="form-label">Password</span>
          <input
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            disabled={formDisabled}
          />
        </label>

        <input
          type="submit"
          value="Log In"
          disabled={formDisabled}
        />
      </form>
    </div>
  );
}

export default SignIn;