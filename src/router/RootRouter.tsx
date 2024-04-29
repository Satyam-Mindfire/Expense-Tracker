import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { SignIn, SignUp, Home } from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoutes";
import { Routes } from "../constants";
import { useAuthContext } from "../contexts";

const RootRouter = () => {
  // Configure nested routes with JSX
  const { user } = useAuthContext();
  const isAuthenticated = !!user;
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
          <Route path={Routes.login} element={<SignIn />} />
          <Route path={Routes.signUp} element={<SignUp />} />
        </Route>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path={Routes.home} element={<Home />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default RootRouter;
