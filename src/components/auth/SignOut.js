import { Navigate } from "react-router-dom";
import { signOut } from "../../api/auth";

const SignOut = (props) => {
  const { user, clearUser } = props;

  signOut(user)
    .then(() => clearUser());

  return <Navigate to="/" replace />;
}

export default SignOut;