import { Link, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { MdLogin } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import useAuth from "../hooks/useAuth";
import GlobalLoader from "./GlobalLoader ";
import { Menu } from "lucide-react";
import Logo from "./Logo";

const Navber = () => {
  const { user, logOutFunc, loading } = useAuth();

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-products">All Products</NavLink>
      </li>
      <li>
        <NavLink to="/blogs">Blogs</NavLink>
      </li>

      {user ? (
        <>
          <li>
            <NavLink to="/myexport">My Exports</NavLink>
          </li>
          <li>
            <NavLink to="/myImport"> My Import</NavLink>
          </li>

          <li>
            <NavLink to="/addProduct">Add Product</NavLink>
          </li>
        </>
      ) : (
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
      )}
    </>
  );

  const logOutUserHandle = async () => {
    try {
      await logOutFunc();
      toast.success("logOut successfull");
    } catch (err) {
      toast.error(err.message);
      console.log(err.message);
    }
  };
  if (loading) {
    return <GlobalLoader />;
  }
  return (
    <div className=" bg-base-100 sticky top-0 z-99">
      <div className="max-w-7xl mx-auto navbar ">
        <div className="navbar-start">
          <div className="dropdown z-999">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-outline lg:hidden mr-2"
            >
              <Menu />
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt={user.displayName}
                      src={
                        user.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-45 p-2 shadow"
                >
                  <li>
                    <Link to="/dashboard" className="justify-between mb-4">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logOutUserHandle}
                      className="btn btn-accent text-white"
                    >
                      Logout <FiLogOut className="font-bold" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="login" className="btn btn-accent text-white">
              Login <MdLogin />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navber;
