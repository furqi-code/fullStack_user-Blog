import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import NotFound from "./components/pages/notFoundpage";
import Home from "./components/pages/home";
import HomeDesign from "./components/pages/homedesign";
import Login from "./components/pages/login";
import Register from "./components/pages/register";
import Blog from "./components/pages/blogs";
import Detail from "./components/pages/cardDetails";
import Profile from "./components/account/profile";
import MyBlogs from "./components/account/myBlogs";
import FavBlog from "./components/account/favouriteBlogs";
import ChangePassword from "./components/account/changePassword";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomeDesign />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/:categoryBlogs",
        element: <Blog />,
      },
      {
        path: "/:categoryBlogs/:blogId",
        element: <Detail />,
      },
      {
        path: "/detail",
        element: <Detail />,
      },
      {
        path: "/account/profile",
        element: <Profile />,
      },
      {
        path: "/account/my-blogs",
        element: <MyBlogs />,
      },
      {
        path: "/account/favourite-blogs",
        element: <FavBlog />,
      },
      {
        path: "/account/change-password",
        element: <ChangePassword />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={routes}></RouterProvider>;
};