import { Navigate, useLocation, Outlet } from "react-router-dom";
import { Routes } from "../constants";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated }) => {
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={Routes.login} state={{ from: location }} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
