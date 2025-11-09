import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthContext from "../Contexts/AuthContext";

const Login = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const { loginWithEmailPass, userWithGoogle, setUser, setLoading } =
    useContext(AuthContext);
  const loginhandle = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password });

    loginWithEmailPass(email, password)
      .then((data) => {
        console.log(data);
        setUser(data.user);
        setLoading(false);
        navigate(location.pathname || "/");
        toast.success("Login successfull !");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  const handleGoogleUser = () => {
    userWithGoogle().then((data) => {
      console.log(data.user);
      setUser(data.user);
      setLoading(false);
      navigate(location.state || "/");
      toast.success("Login successfull !");
    });
  };
  return (
    <div>
      <div>
        <div className="hero bg-base-200 min-h-screen">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <h2 className="text-center font-semibold text-xl">Login Now</h2>
              <form onSubmit={loginhandle}>
                <fieldset className="fieldset">
                  {/* Email  */}
                  <label className="label">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="input"
                    placeholder="Your Email..."
                  />
                  {/* Password  */}
                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type={show ? "text" : "password"}
                      name="password"
                      required
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

                  <button className="btn btn-accent text-white mt-4">
                    Login
                  </button>
                </fieldset>
              </form>

              <p>
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className=" text-blue-700 link link-hover hover:text-accent"
                >
                  Sign up
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
    </div>
  );
};

export default Login;
