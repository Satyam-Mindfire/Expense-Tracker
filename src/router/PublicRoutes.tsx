import { Navigate, useLocation, Outlet } from "react-router-dom";
import { Routes } from "../constants";

interface PublicRouteProps {
  isAuthenticated: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ isAuthenticated }) => {
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to={Routes.home} state={{ from: location }} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default PublicRoute;
