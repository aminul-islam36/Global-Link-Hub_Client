import React from "react";
import {
  FaUserEdit,
  FaEnvelope,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";

const Profile = () => {
  const { user, logOutFunc } = useAuth();

  const handleLogout = async () => {
    await logOutFunc();
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <Helmet>
        <title>My Profile</title>
      </Helmet>

      <div className="card w-full max-w-lg bg-base-100 shadow-xl rounded-3xl">
        {/* Avatar */}
        <div className="flex justify-center mt-8">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-accent ring-offset-base-100 ring-offset-4">
              <img
                src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt="User Avatar"
              />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="card-body items-center text-center">
          <h2 className="text-2xl font-bold">
            {user?.displayName || "Anonymous User"}
          </h2>

          <p className="flex items-center gap-2 text-sm opacity-70">
            <FaEnvelope /> {user?.email}
          </p>

          <div className="badge badge-accent badge-outline mt-2 flex items-center gap-2">
            <FaUserShield /> User
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 w-full my-6">
            <div className="stat bg-base-200 rounded-xl">
              <div className="stat-title text-xs">Orders</div>
              <div className="text-sm text-accent">5</div>
            </div>

            <div className="stat bg-base-200 rounded-xl">
              <div className="stat-title text-xs">Products</div>
              <div className="text-sm text-accent">4</div>
            </div>

            <div className="stat bg-base-200 rounded-xl">
              <div className="stat-title text-xs">Role</div>
              <div className=" text-sm text-accent">User</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 w-full">
            <button className="btn btn-outline btn-accent flex-1">
              <FaUserEdit /> Edit Profile
            </button>

            <button
              onClick={handleLogout}
              className="btn btn-error text-white flex-1"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
