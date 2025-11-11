import React from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
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
import ViewDetails from "../Pages/ViewDetails";

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
        path: "/myexport",
        element: (
          <PrivateRoute>
            <MyExport />
          </PrivateRoute>
        ),
      },
      {
        path: "/myImport",
        element: <MyImport></MyImport>,
      },
      {
        path: "/addProduct",
        element: <AddProduct />,
      },
      {
        path: "/viewDetails/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/importedProducts/${params.id}`),
        element: <ViewDetails></ViewDetails>,
      },
      {
        path: "/details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/products/${params.id}`),
        element: <Details />,
      },
    ],
  },
]);

export default router;
