import React from "react";

const GlobalLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <span className="loading loading-spinner loading-lg text-accent"></span>
      <span>Loading...</span>
    </div>
  );
};

export default GlobalLoader;
