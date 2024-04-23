import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import Home from "../pages/home/Home";

const RootRouter = () => {
  // Configure nested routes with JSX
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default RootRouter;
