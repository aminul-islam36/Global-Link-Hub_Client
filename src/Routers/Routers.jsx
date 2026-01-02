import React from "react";
import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import HomePage from "../Pages/HomePage";
import AllProducts from "../Pages/AllProducts";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import Details from "../Pages/Details";
import MyExport from "../Pages/MyExport";
import AddProduct from "../Pages/AddProduct";
import MyImport from "../Pages/MyImport";
import ErrorPage from "../Pages/ErrorPage";
import Blogs from "../Pages/Blogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/all-products",
        element: <AllProducts />,
      },
      {
        path: "/myexport",
        element: (
          <PrivateRoute>
            <MyExport />
          </PrivateRoute>
        ),
      },
      {
        path: "/myImport",
        element: (
          <PrivateRoute>
            <MyImport />
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/addProduct",
        element: (
          <PrivateRoute>
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/details/:id",
        loader: ({ params }) =>
          fetch(`https://global-link-hub.vercel.app/products/${params.id}`),
        element: <Details />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  { path: "*", element: <ErrorPage /> },
]);

export default router;
