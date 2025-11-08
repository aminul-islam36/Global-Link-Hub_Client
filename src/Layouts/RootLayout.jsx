import React from "react";
import Navber from "../Components/Navber";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navber />
      <div className="mx-auto w-11/12">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
