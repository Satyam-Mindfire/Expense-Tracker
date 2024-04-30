import { Navigate, useLocation, Outlet } from "react-router-dom";
import { Routes } from "../constants";

/**
 * Component for rendering protected routes.
 * 
 * @param isAuthenticated Boolean indicating whether the user is authenticated
 * @returns A protected route component
 */
interface ProtectedRouteProps {
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated }) => {
  const location = useLocation();

  // Redirect to the login page if the user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to={Routes.login} state={{ from: location }} />;
  }

  // Render the protected route content if the user is authenticated
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
