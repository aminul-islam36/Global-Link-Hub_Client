import { useEffect, useState } from "react";
import Navber from "../Components/Navber";
import { Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

const RootLayout = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const ThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen justify-between bg-base-200">
      <Navber />
      <Outlet />
      <Footer />
      <button
        onClick={ThemeToggle}
        className="fixed bottom-6 right-6 btn btn-accent rounded-full text-white z-10"
      >
        {theme === "light" ? "Dark Mode" : "Light Mode"}
      </button>
    </div>
  );
};

export default RootLayout;
