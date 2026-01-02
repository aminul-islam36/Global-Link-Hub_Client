import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link
      to="/"
      className="text-2xl font-bold border-b-2 border-b-accent min-w-fit"
    >
      Global <span className="text-accent">Hub</span>
    </Link>
  );
};

export default Logo;
