import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "../Layouts/RootLayout";
import HomePage from "../Pages/HomePage";
import AllProducts from "../Pages/AllProducts";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import MyProducts from "../Pages/MyProducts";
import NewProduct from "../Pages/NewProduct";
import PrivateRoute from "./PrivateRoute";

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
        path: "/products",
        element: <AllProducts />,
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
        path: "/myProducts",
        element: (
          <PrivateRoute>
            <MyProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/newProduct",
        element: <NewProduct />,
      },
    ],
  },
]);

export default router;
