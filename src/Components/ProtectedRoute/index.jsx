import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../Context/AppContext";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useContext(AppContext);
  return authUser ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
