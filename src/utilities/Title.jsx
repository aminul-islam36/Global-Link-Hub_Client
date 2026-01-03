import React from "react";

const Title = ({ children }) => {
  return (
    <h2 className="text-2xl md:text-3xl lg:text-4xl text-accent font-semibold md:font-bold raleway mb-5">
      {children}
    </h2>
  );
};

export default Title;
