import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { checkUsernameUnique, signUp, signIn } from "../../api/auth";

const SignUp = (props) => {
  const { setUser } = props;
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormDisabled(true);

    // validate signup data
    let validationFailed = false;
    const nameIsUnique = (await checkUsernameUnique(username)).data.unique;
    if (!username) {
      alert("You must enter a username.");
      validationFailed = true;
    }
    else if (!password) {
      alert("You must enter a password.");
      validationFailed = true;
    }
    else if (password !== passwordConfirm) {
      alert("The entered passwords don't match.");
      validationFailed = true;
    }
    else if (username === password) {
      alert("You cannot use your username as your password.");
      validationFailed = true;
    }
    else if (!nameIsUnique) {
      alert("Sorry, that username is already taken.");
      validationFailed = true;
    }

    // fail and return control to the user if invalid
    if (validationFailed) {
      setFormDisabled(false);
      return;
    }

    // otherwise, create a new user and automagically sign in
    const credentials = {
      username,
      password,
      password_confirmation: passwordConfirm
    };

    signUp(credentials)
      .then(() => signIn(credentials))
      .then(res => setUser(res.data.user))
      .then(() => navigate("/"))
      .then(() => alert("Account created! You have been logged in as well."))
      .catch(() => alert("Sorry, account creation failed."));

    setFormDisabled(false);
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handlePasswordConfirmChange = (event) => {
    setPasswordConfirm(event.target.value);
  }

  return (
    <div id="sign-up-main">
      <h1>Create an Account</h1>
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

        <label>
          <span className="form-label">Confirm Password</span>
          <input
            name="password-confirm"
            type="password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            disabled={formDisabled}
          />
        </label>

        <input
          type="submit"
          value="Create Account"
          disabled={formDisabled}
        />
      </form>
    </div>
  );
}

export default SignUp;