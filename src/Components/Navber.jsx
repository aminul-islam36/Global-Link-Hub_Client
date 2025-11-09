import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import { toast } from "react-toastify";
import Loading from "./Loading";

const Navber = () => {
  const { setUser, user, logOutFunc, loading } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/products">Products</NavLink>
      </li>
      <li>
        <NavLink to="/myProducts">My Products</NavLink>
      </li>
      <li>
        <NavLink to="/newProduct">New Product</NavLink>
      </li>
      {user ? (
        ""
      ) : (
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
      )}
    </>
  );

  const logOutUserHandle = () => {
    logOutFunc()
      .then(() => {
        toast.success("logOut successfull");
        setUser(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" bg-base-100">
      <div className=" w-11/12 mx-auto navbar ">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="text-2xl font-bold border-b-2 border-b-accent"
          >
            Global <span className="text-accent">Hub</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {loading ? (
            <Loading />
          ) : user ? (
            <div className="flex items-center gap-3">
              <div className="dropdown dropdown-center">
                <div tabIndex={0} role="button" className="avatar">
                  <div className="w-12 rounded-full border border-gray-300 cursor-pointer">
                    <img
                      src={
                        user.photoURL ||
                        "https://img.freepik.com/premium-vector/user-icon-icon_1076610-59410.jpg"
                      }
                      alt="User"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-10 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li className="text-center font-semibold text-gray-700">
                    {user.displayName || "Anonymous"}
                  </li>
                </ul>
              </div>
              <button
                onClick={logOutUserHandle}
                className="btn btn-accent text-white"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link to="login" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
