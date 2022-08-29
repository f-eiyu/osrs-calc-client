import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { changePassword } from "../../api/user";

const ChangePassword = (props) => {
  const { user } = props;
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formDisabled, setFormDisabled] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    setFormDisabled(true);

    const passwords = {oldPassword, newPassword};
    changePassword(user, passwords)
      .then(() => alert("Password changed successfully!"))
      .then(() => navigate("/settings"))
      .catch(() => {
        alert("Password change failed - double-check your old password.");
        setOldPassword("");
        setNewPassword("");
      })
      .finally(() => setFormDisabled(false));
  }

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
  }

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  }

  return (
    <div id="change-password-main">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <span className="form-label">Old Password</span>
          <input
            name="old-password"
            type="password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            disabled={formDisabled}
          />
        </label>

        <label>
          <span className="form-label">New Password</span>
          <input
            name="new-password"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            disabled={formDisabled}
          />
        </label>

        <input
          type="submit"
          value="Change"
          disabled={formDisabled}
        />
      </form>
    </div>
  );
};

export default ChangePassword;