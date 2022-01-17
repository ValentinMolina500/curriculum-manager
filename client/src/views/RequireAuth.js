import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  let authState = useSelector(state => state.auth)
  let location = useLocation()

  if (!authState.isAuthenticated) {
    return <Navigate to ="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth