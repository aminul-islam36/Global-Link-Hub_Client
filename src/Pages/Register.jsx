import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { FaUserPlus } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

const Register = () => {
  const [show, setShow] = useState(false);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { registerWithEmailPass, userWithGoogle } = useAuth();

  const handleRegister = (data) => {
    const name = data.name;
    const photoURL = data.photoURL;
    const email = data.email;
    const password = data.password;
    const passwordVelidation = /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@#$%^&*!]{6,}$/;
    if (!passwordVelidation.test(password)) {
      toast(
        "Password must be at least 6 characters, 1 uppercase and 1 lowercase."
      );
      return;
    }
    registerWithEmailPass(email, password)
      .then((res) => {
        const user = res.user;
        updateProfile(user, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            toast.success("Register successful !");
            navigate("/");
          })
          .catch((error) => {
            console.error(error);
            toast.error("Profile update failed");
          });
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.message);
      });
  };

  const handleGoogleUser = () => {
    userWithGoogle()
      .then((res) => {
        // console.log(data);
        const user = res.user;
        updateProfile(user, {
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
          .then(() => {
            toast.success("Register successful !");
            navigate("/");
          })
          .catch((error) => {
            console.error(error);
            toast.error("Profile update failed");
          });
      })
      .catch((err) => {
        // console.log(err);
        toast.error(err.message);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Register Page</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body py-12">
            <h2 className="text-center font-semibold text-xl">Register Now</h2>
            <form onSubmit={handleSubmit(handleRegister)}>
              <fieldset className="fieldset">
                {/* Name Fild  */}
                <label className="label">Your Name</label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Please enter your name",
                  })}
                  className="input"
                  placeholder="Your Name..."
                />
                {/* Photo URL  */}
                <label className="label">Photo URL</label>
                <input
                  type="text"
                  {...register("photoURL")}
                  className="input"
                  placeholder="Photo URL..."
                />
                {/* Email  */}
                <label className="label">Your Email</label>
                <input
                  type="email"
                  {...register("email", { required: "please enter email" })}
                  className="input"
                  placeholder="Your Email..."
                />
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    {...register("password", {
                      required: "please enter password",
                    })}
                    className="input"
                    placeholder="******"
                  />
                  <span
                    onClick={() => setShow(!show)}
                    className="absolute top-1/2 -translate-y-1/2 right-6 cursor-pointer z-20"
                  >
                    {show ? "Hide" : "Show"}
                  </span>
                </div>

                <button className="btn btn-accent text-white text-lg mt-4">
                  Register <FaUserPlus />
                </button>
              </fieldset>
            </form>
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-700 link link-hover hover:text-accent"
              >
                Log in Now
              </Link>
            </p>
            <div className="divider text-lg">or</div>
            {/* Google */}
            <button
              onClick={handleGoogleUser}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
