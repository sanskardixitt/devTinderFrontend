import React, { useState } from "react";
import LoginImage from "../assets/undraw_social-friends_b0ay.svg";
import axios from "axios";

import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASEURL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Track login state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    setLoading(true); // Disable button during login attempt

    try {
      const res = await axios.post(
        `${BASEURL}/login`,
        { emailId: email, password: password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Login successful!");
        dispatch(addUser(res.data.data));
        return navigate("/");
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error("Invalid email or password.");
        } else if (error.response.status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error(error.response.data.message || "Login failed.");
        }
      } else if (error.request) {
        toast.error(
          "No response from server. Please check your internet connection."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Re-enable button after request completes
    }
  };

  return (
    <>
      <div className="flex justify-center items-center pt-4">
        <div className="mx-4 p-1 my-2 mt-5 w-[70%]">
          <div className="card lg:card-side bg-linear-to-bl from-deepSky-100 to-lightFog-100 shadow-xl">
            <figure className="lg:w-[50%] md:w-44 sm:w-40">
              <img
                src={LoginImage}
                alt="Login Illustration"
                className="w-fit"
              />
            </figure>
            <div className="card-body">
              <div className="flex justify-center items-center h-full p-2 bg-deepSky-100 rounded-3xl">
                <div className="w-full max-w-md p-6 bg-mutedSteel-100 shadow-lg rounded-2xl">
                  <h2 className="text-2xl font-bold text-center mb-6 text-deepSky-100">
                    Let's Login!
                  </h2>

                  <div>
                    {/* Email Input */}
                    <div className="mb-4 w-full flex justify-center items-center">
                      <label className="input input-bordered flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                        </svg>
                        <input
                          type="text"
                          className="grow bg-deepSky-100"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </label>
                    </div>

                    {/* Password Input */}
                    <div className="mb-6 w-full flex justify-center items-center">
                      <label className="input input-bordered flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="h-4 w-4 opacity-70"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <input
                          type="password"
                          className="grow bg-deepSky-100"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </label>
                    </div>

                    {/* Login Button */}
                    <div className="w-full flex justify-center items-center">
                      <button
                        className={`btn btn-wide ${
                          loading
                            ? "opacity-50 cursor-not-allowed"
                            : "bg-deepSky-100 text-white"
                        }`}
                        onClick={handleLogin}
                        disabled={loading}
                      >
                        {loading ? "Logging in..." : "Login"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Login;
