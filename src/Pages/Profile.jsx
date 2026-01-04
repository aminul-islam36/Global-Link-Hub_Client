import React, { useState } from "react";
import {
  FaUserEdit,
  FaEnvelope,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import axios from "axios";

const Profile = () => {
  const { user, updateUserProfile, logOutFunc } = useAuth();
  const { register, handleSubmit } = useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    await logOutFunc();
  };

  // Upload image to ImgBB

  const handleUpdateProfile = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", data.file[0]);

    const imageBB = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      formData
    );

    try {
      let photoURL = imageBB.data.data.url;
      await updateUserProfile(data.name, photoURL);
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setLoading(false);
    }
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
              <div className="text-sm text-accent">User</div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 w-full">
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-outline btn-accent flex-1"
            >
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

      {/* Edit Profile Modal */}
      {isEditing && (
        <dialog open className="modal modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit Profile</h3>

            <form
              onSubmit={handleSubmit(handleUpdateProfile)}
              className="space-y-3"
            >
              <input
                defaultValue={user?.displayName || ""}
                {...register("name")}
                className="input input-bordered w-full"
                placeholder="Full Name"
              />

              <input
                type="file"
                {...register("file")}
                required
                className="file-input input-bordered w-full"
              />

              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className={`btn btn-accent text-white flex-1 ${
                    loading ? "loading" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Profile;
