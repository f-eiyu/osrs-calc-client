import { Navigate } from "react-router-dom";

const RequireAuth = (props) => {
  const { user, children } = props;

  return (user ? children : <Navigate to="/sign-in" replace />);
}

export default RequireAuth;