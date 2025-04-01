import React, { useState } from "react";
import LoginImage from "../assets/undraw_social-friends_b0ay.svg";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import { BASEURL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    setLoading(true);

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
      setLoading(false);
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
                    <div className="mb-4 w-full flex justify-center items-center">
                      <label className="input input-bordered flex items-center gap-2">
                        <input
                          type="text"
                          className="grow bg-deepSky-100"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </label>
                    </div>

                    <div className="mb-6 w-full flex justify-center items-center">
                      <label className="input input-bordered flex items-center gap-2">
                        <input
                          type="password"
                          className="grow bg-deepSky-100"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </label>
                    </div>

                    <div className="w-full flex justify-center items-center">
                      <button
                        className={`btn btn-wide ${
                          loading
                            ? "opacity-50 cursor-not-allowed"
                            : "bg-deepSky-100 text-lightFog-100"
                        }`}
                        onClick={handleLogin}
                        disabled={loading}
                      >
                        {loading ? "Logging in..." : "Login"}
                      </button>
                    </div>

                    <p className="text-center mt-4 text-sm text-darkSlate-100">
                      New User?{" "}
                      <Link to="/signup" className="text-deepSky-100 font-bold">
                        Sign Up
                      </Link>
                    </p>
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
