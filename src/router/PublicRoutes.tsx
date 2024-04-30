import { Navigate, useLocation, Outlet } from "react-router-dom";
import { Routes } from "../constants";

/**
 * Component for rendering public routes.
 * 
 * @param isAuthenticated Boolean indicating whether the user is authenticated
 * @returns A public route component
 */
interface PublicRouteProps {
  isAuthenticated: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ isAuthenticated }) => {
  const location = useLocation();

  // Redirect to the home page if the user is authenticated
  if (isAuthenticated) {
    return <Navigate to={Routes.home} state={{ from: location }} />;
  }

  // Render the public route content if the user is not authenticated
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicRoute;
